# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from gaesessions import get_current_session
from django.template import RequestContext,loader,Context
from google.appengine.api import users
import logging
from google.appengine.ext import ndb
import datetime

from django.core.context_processors import csrf

# redirect to home page
# html : homepage.html

def home(request):
     return render_to_response('eazzer.html',{'loginurl': users.create_login_url('/'),},context_instance = RequestContext(request))
