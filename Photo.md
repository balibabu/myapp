# send multiple of files

* backend
@api_view(['POST'])
def test2(request):
    files = request.FILES.getlist('files')
    for file in files:
        print(file)
    return Response('hi')

* frontend
for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
}

