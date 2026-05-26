from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Answer, Module, UserProgress

@receiver(post_save, sender=Answer)
def update_student_progress(sender, instance, created, **kwargs):
   
    if created:
        user = instance.user
        module = instance.task.module  
        
        total_tasks = module.tasks.count()
        
        if total_tasks > 0:
            correct_count = Answer.objects.filter(
                user=user, 
                task__module=module, 
                is_correct=True
            ).count()
            
            progress_percent = (correct_count / total_tasks) * 100
            
            progress_obj, _ = UserProgress.objects.get_or_create(user=user, module=module)
            progress_obj.progress = progress_percent
            
            if progress_percent >= 80:
                progress_obj.is_completed = True
                
                next_module = Module.objects.filter(
                    course=module.course, 
                    order__gt=module.order
                ).order_by('order').first()
                
                if next_module:
                    UserProgress.objects.get_or_create(
                        user=user, 
                        module=next_module, 
                        defaults={'is_locked': False}
                    )
            
            progress_obj.save()