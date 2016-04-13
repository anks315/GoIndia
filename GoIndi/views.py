# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render_to_response
from GoIndi.trainapi import parseTrainBetweenStationsAndReturnTrainNumber, parseAndReturnFare
from gaesessions import get_current_session
from django.template import RequestContext,loader,Context
from google.appengine.api import users
import logging
from google.appengine.ext import ndb
import datetime
import trainapi
from flightapi import parseFlightAndReturnFare
import urllib2
import json
from google.appengine.api import urlfetch


from django.core.context_processors import csrf

# redirect to home page
# html : homepage.html

trainController = trainapi.TrainController()
def home(request):
     return render_to_response('eazzer.html',{'loginurl': users.create_login_url('/'),},context_instance = RequestContext(request))

def main(request):
     return render_to_response('main.html',{'loginurl': users.create_login_url('/'),},context_instance = RequestContext(request))

def test(request):
     return render_to_response('index.html',{'loginurl': users.create_login_url('/'),},context_instance = RequestContext(request))

def trainapi(request):
    source = request.GET['source']
    destination = request.GET['destination']
    journeyDate = request.GET['journeyDate']
    session = get_current_session()
    session['source']=source
    session['destination']=destination
    resultJsonData = trainController.getRoutes(source,destination,journeyDate)
    return HttpResponse(json.dumps(resultJsonData), content_type='application/json')

def flightapi(request):
    api_key = "AIzaSyAgFB2oxb44p3tgUM-baPQsT2eN_Vz1TVQ"
    url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=" + api_key
    headers = {'content-type': 'application/json'}
    params = {
        "request": {
        "slice": [
                    {
                    "origin": "DEL",
                    "destination": "BLR",
                    "date": "2016-04-20"
                    }
                ],
        "passengers": {
                    "adultCount": 1
                      },
        "solutions": 5
                     }
            }

    jsonreq = json.dumps(params, encoding = 'utf-8')
    req = urllib2.Request(url, jsonreq, {'Content-Type': 'application/json'})
    flight = urllib2.urlopen(req)
    response = flight.read()
    flight.close()
    return HttpResponse(json.dumps(parseFlightAndReturnFare(response)), content_type='application/json')


