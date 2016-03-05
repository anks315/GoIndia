__author__ = 'ankur'


import hmac

def generateHash():

    digest_maker = hmac.new('f707f95d07aa0f270d07bf71c74dc915')
    digest_maker.update('cnbjson14c98f7aca50827374ab773844a9ca1b');
    return digest_maker.hexdigest();
