import os
from google.oauth2 import id_token
from google.auth.transport import requests

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', None)


def verify_id_token(token):
    id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)

    if id_info['aud'] != GOOGLE_CLIENT_ID:
        raise ValueError('Invalid audience')

    user_details = {
        'email': id_info['email'],
        'name': id_info.get('name'),
        'email_verified': id_info['email_verified'],
        'picture': id_info.get('picture'),
        'sub': id_info['sub'],  # Unique user ID
    }

    return user_details
