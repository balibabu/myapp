# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    # Handle sending messages here
    # ...
    pass

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(request):
    messages = Message.objects.filter(receiver=request.user).order_by('timestamp')
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_new_messages(request, last_message_id):
    # Retrieve new messages added after the provided last_message_id
    new_messages = Message.objects.filter(receiver=request.user, id__gt=last_message_id).order_by('timestamp')
    serializer = MessageSerializer(new_messages, many=True)
    return Response(serializer.data)
