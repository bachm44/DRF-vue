from django.apps import AppConfig


class AuthConfig(AppConfig):
    name = 'apps.auth'
    label = 'unique.auth'

    def ready(self):
        import apps.auth.signals
