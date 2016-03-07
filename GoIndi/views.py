# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from gaesessions import get_current_session
from django.template import RequestContext,loader,Context
from google.appengine.api import users
import logging
from google.appengine.ext import ndb
import datetime
from trainapi import generateHash
import urllib2
import json

from django.core.context_processors import csrf

# redirect to home page
# html : homepage.html

def home(request):
     return render_to_response('eazzer.html',{'loginurl': users.create_login_url('/'),},context_instance = RequestContext(request))

def trainapi(request):
    response = urllib2.urlopen('http://railpnrapi.com/test/station_by_code/code/cnb/format/json/pbapikey/14c98f7aca50827374ab773844a9ca1b/pbapisign/' + generateHash())
    data = json.load(response)
    return render_to_response('eazzer.html',{'loginurl':data,},context_instance = RequestContext(request))

