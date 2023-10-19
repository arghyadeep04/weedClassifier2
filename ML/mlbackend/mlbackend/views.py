import sys
sys.path.append("..")
from deepweeds import return_back
import json
from django.http import JsonResponse

def getclass(req):
    url=req.GET.get("url","")
    ans=return_back(url)
    return JsonResponse({'answer':ans})

def home(req):
    return JsonResponse({'answer':"HELLO"})