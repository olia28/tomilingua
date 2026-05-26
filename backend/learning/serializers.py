from rest_framework import serializers
from .models import User

class RegistrationSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'birth_date', 'password', 'password_confirm']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Паролі не збігаються.")
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        validated_data['username'] = validated_data.get('email')
        user = User.objects.create_user(**validated_data)
        return user