import os
from azure.communication.email import EmailClient

connection_string = "endpoint=https://my-cs.africa.communication.azure.com/;accesskey=D2R2aXyCi2v6lA8777YQAomMvvRuKWrqJwJWUckZT1fq5gUOynXVJQQJ99BBACULyCp3uTeLAAAAAZCSPslj"

def send_email():
    try:
        email_client = EmailClient.from_connection_string(connection_string)
        message = {
            "content": {
                "subject": "This is the subject",
                "plainText": "This is the body",
                "html": "<html><h1>This is the body</h1></html>"
            },
            "recipients": {
                "to": [
                    {
                        "address": "monyorojoseph@gmail.com",
                        "displayName": "Customer Name"
                    }
                ]
            },
            "senderAddress": "DoNotReply@ca9b7e75-d7a9-4572-a819-7686814b307f.azurecomm.net"
        }

        poller = email_client.begin_send(message)
        print("Result: " + poller.result())

    except Exception as ex:
        print('Exception:')
        print(ex)