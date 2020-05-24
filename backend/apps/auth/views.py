from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

import os
import urllib
import json
from termcolor import colored

def pretty_request(request):
    headers = ''
    for header, value in request.META.items():
        if not header.startswith('HTTP'):
            continue
        header = '-'.join([h.capitalize() for h in header[5:].lower().split('_')])
        headers += '{}: {}\n'.format(header, value)

    return (
        '{method} HTTP/1.1\n'
        'Content-Length: {content_length}\n'
        'Content-Type: {content_type}\n'
        '{headers}\n\n'
        '{body}'
    ).format(
        method=request.method,
        content_length=request.META['CONTENT_LENGTH'],
        content_type=request.META['CONTENT_TYPE'],
        headers=headers,
        body=request.body,
    )    


class ReCaptchaValidate(APIView):
    def post(self, request, format=None):
        if request.method == 'POST':
            secret_key = os.getenv('RECAPTCHA_V3_SECRET')
            recaptcha_response = request.data['token']
            url = 'https://www.google.com/recaptcha/api/siteverify'
            data = {
                'secret': secret_key,
                'response': recaptcha_response
            }
            
            data = urllib.parse.urlencode(data).encode()
            req = urllib.request.Request(url, data=data)
            response = urllib.request.urlopen(req)
            result = json.loads(response.read().decode())
            print(colored(result['score'], 'red'))
        return Response(result['score'] > 0.3)

