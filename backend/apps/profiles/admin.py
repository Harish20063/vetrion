from django.contrib import admin
from .models import WorkerProfile, EmployerProfile

@admin.register(WorkerProfile)
class WorkerProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'area', 'expected_pay', 'pay_unit', 'experience_years', 'availability')
    list_filter = ('city', 'availability', 'pay_unit')
    search_fields = ('name', 'headline', 'area', 'about')

@admin.register(EmployerProfile)
class EmployerProfileAdmin(admin.ModelAdmin):
    list_display = ('name_or_business', 'kind', 'city', 'area')
    list_filter = ('kind', 'city')
    search_fields = ('name_or_business', 'area', 'about')
