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

def trainapi(request):
    #response = urllib2.urlopen('http://railpnrapi.com/api/trains_between_stations/fscode/NDLS/tscode/CnB/date/10-03-2016/class/1A/orderby/time/format/json/pbapikey/14c98f7aca50827374ab773844a9ca1b/pbapisign/' + generateHash())
    '''
    urlfetch.set_default_fetch_deadline(45)

    jsonResponseTrainBetweenStations = urlfetch.fetch("http://api.railwayapi.com/between/source/ndls/dest/bct/date/15-05/apikey/kylhf9760/",method=urlfetch.GET, deadline=45)
    availableTrainNumbers = parseTrainBetweenStationsAndReturnTrainNumber(jsonResponseTrainBetweenStations)
    resultJsonData = {}
    resultJsonData["train"]=[]
    trainCounter=0
    for trainNumber in availableTrainNumbers:
        trainCounter=trainCounter+1
        jsonResponseTrainFare = urlfetch.fetch("http://api.railwayapi.com/fare/train/" + trainNumber + "/source/ndls/dest/bct/age/18/quota/GN/doj/15-03-2016/apikey/kylhf9760/",method=urlfetch.GET, deadline=45)
        fareData=parseAndReturnFare(jsonResponseTrainFare,trainCounter)
        if not fareData:
            pass
        else:
            resultJsonData["train"].append(fareData)

    '''
    resultJsonData = trainController.getRoutes('Delhi','Mumbai','15-05-2016')
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


