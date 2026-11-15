from django.contrib import admin
from .models import Job, Application, SavedJob, ContactUnlock, Report

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'employer', 'city', 'area', 'pay', 'pay_unit', 'status', 'created_at')
    list_filter = ('status', 'city', 'work_type', 'pay_unit', 'created_at')
    search_fields = ('title', 'description', 'area')
    actions = ['close_jobs', 'reopen_jobs', 'remove_spam_jobs']

    def close_jobs(self, request, queryset):
        queryset.update(status='closed')
        self.message_user(request, "Selected jobs marked as closed.")
    close_jobs.short_description = "Mark selected jobs as closed"

    def reopen_jobs(self, request, queryset):
        queryset.update(status='open')
        self.message_user(request, "Selected jobs reopened.")
    reopen_jobs.short_description = "Reopen selected jobs"

    def remove_spam_jobs(self, request, queryset):
        count = queryset.count()
        queryset.delete()
        self.message_user(request, f"Removed {count} spam jobs permanently.")
    remove_spam_jobs.short_description = "Remove spam jobs (delete)"


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('job', 'worker', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('job__title', 'worker__phone')


@admin.register(SavedJob)
class SavedJobAdmin(admin.ModelAdmin):
    list_display = ('worker', 'job', 'created_at')


@admin.register(ContactUnlock)
class ContactUnlockAdmin(admin.ModelAdmin):
    list_display = ('viewer', 'target', 'created_at')
    search_fields = ('viewer__phone', 'target__phone')


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('reporter', 'target_type', 'target_id', 'status', 'created_at')
    list_filter = ('status', 'target_type', 'created_at')
    search_fields = ('reporter__phone', 'reason')
    actions = ['mark_reviewed', 'mark_action_taken', 'dismiss_reports']

    def mark_reviewed(self, request, queryset):
        queryset.update(status='reviewed')
    mark_reviewed.short_description = "Mark as reviewed"

    def mark_action_taken(self, request, queryset):
        queryset.update(status='action_taken')
    mark_action_taken.short_description = "Mark as action taken"

    def dismiss_reports(self, request, queryset):
        queryset.update(status='dismissed')
    dismiss_reports.short_description = "Dismiss selected reports"
