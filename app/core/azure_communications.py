import os
import logging
from azure.communication.email import EmailClient

logger = logging.getLogger(__name__)

connection_string = os.environ.get('COMMUNICATION_SERVICES_CONNECTION_STRING', None)

# {
#     "content": {
#         "subject": "Password Reset",
#         "plainText": "This is the body",
#         "html": "<html><h1>This is the body</h1></html>"
#     },
#     "recipients": {
#         "to": [
#             {
#                 "address": "monyorojoseph@gmail.com",
#                 "displayName": "Jonah"
#             },

#             {
#                 "address": "monyorojoseph@outlook.com",
#                 "displayName": "Joseph"
#             },

#             {
#                 "address": "ygia35433@gmail.com",
#                 "displayName": "Joseph"
#             }
#         ]
#     },
#     "senderAddress": "DoNotReply@binaryjinx.com"
# }

def send_email(content, recipients, senderAddress="DoNotReply@binaryjinx.com"):
    if connection_string is None:
        logger.error('No connection string found')
        return
    try:
        email_client = EmailClient.from_connection_string(connection_string)
        message = {
            "content": content,
            "recipients": { "to": recipients },
            "senderAddress": senderAddress
        }

        poller = email_client.begin_send(message)
        resp = poller.result()

        status = resp['status']
        if status == 'Succeded':
            pass
        error = resp['error']
        if error:
            logger.error('Error:')
            logger.error(error)

    except Exception as ex:
        logger.error('Exception:')
        logger.error(ex)
