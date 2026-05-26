from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth import get_user_model, authenticate 
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegistrationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Progress

User = get_user_model()

class RegisterView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Користувача успішно створено"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email') or request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=email, password=password)
        
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'first_name': user.first_name or "Користувач"
            }, status=200)
        else:
            return Response({'error': 'Invalid credentials'}, status=401)

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            current_host = request.get_host().split(':')[0]

            reset_link = f"http://{current_host}:5173/resetconfirm/{uid}/{token}"
            
            send_mail(
                'Відновлення доступу Tomilingua',
                f'Вітаю! Для відновлення доступу до акаунту на платформі tomilingua, перейдіть за посиланням для входу: {reset_link}. Якщо ви не намагались відновити доступ, то ігноруйте цей лист.',
                'tomilinguanoreply@gmail.com',
                [email],
                fail_silently=False,
            )
        
        return Response({"message": "Якщо пошта існує, лист надіслано."}, status=200)

class PasswordResetConfirmView(APIView):
    def post(self, request, *args, **kwargs):
        uidb64 = request.data.get('uid')
        token = request.data.get('token')

        if not uidb64 or not token:
            return Response({'error': 'uid та token обов’язкові в тілі запиту'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            auth_token, _ = Token.objects.get_or_create(user=user)
            
            return Response({
                'token': auth_token.key, 
                'first_name': user.first_name or user.username,
                'message': 'Вхід успішний'
            }, status=status.HTTP_200_OK)
        
        return Response({'error': 'Посилання недійсне або прострочене'}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone_number": user.phone_number or "",
            "birth_date": user.birth_date if user.birth_date else ""
        }, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        data = request.data

        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'phone_number' in data:
            user.phone_number = data['phone_number']
        if 'birth_date' in data:
            user.birth_date = data['birth_date'] if data['birth_date'] else None
        
        user.save()

        return Response({
            "message": "Профіль успішно оновлено",
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone_number": user.phone_number or "",
            "birth_date": user.birth_date or ""
        }, status=status.HTTP_200_OK)
        
    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"message": "Акаунт успішно видалено"}, status=status.HTTP_204_NO_CONTENT)

class UserProgressView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        progress, created = Progress.objects.get_or_create(user=request.user)
        return Response({
            "completed_modules_count": progress.completed_modules_count,
            "average_score": progress.average_score,
            "current_step": progress.current_step,
            "is_learned": progress.is_learned
        })

    def post(self, request):
        progress, created = Progress.objects.get_or_create(user=request.user)
        
        score = request.data.get("score", 0)
        total = request.data.get("total", 1)
        
        test_percentage = (score / total) * 100
        
        current_count = progress.completed_modules_count
        current_average = progress.average_score
        
        new_count = current_count + 1
        new_average = ((current_average * current_count) + test_percentage) / new_count
        
        progress.completed_modules_count = new_count
        progress.average_score = round(new_average, 2)
        
        is_correct = test_percentage >= 70
        progress.update_pimsleur(is_correct)
        
        return Response({
            "status": "success",
            "completed_modules_count": progress.completed_modules_count,
            "average_score": progress.average_score
        })