from datetime import timedelta
from django.utils import timezone

class PimsleurScheduler:
    INTERVALS = [5, 25, 120, 600, 3600, 18000, 86400, 432000, 2160000]

    @staticmethod
    def get_next_review_date(current_step):
        if current_step >= len(PimsleurScheduler.INTERVALS):
            seconds_to_add = PimsleurScheduler.INTERVALS[-1]
        else:
            seconds_to_add = PimsleurScheduler.INTERVALS[current_step]
            
        return timezone.now() + timedelta(seconds=seconds_to_add)