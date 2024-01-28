import sys,os
sys.path.append(os.path.join(sys.path[0],'..'))
from DeepWeeds import return_back
import json
from django.http import JsonResponse,HttpResponse

def getclass(req):
    url=req.GET.get("url","")
    ans=return_back(url)
    return JsonResponse({'answer':ans})

def home(req):
    return JsonResponse({'answer':"HELLO"})