__author__ = 'ankur'


import hmac

def generateHash():

    digest_maker = hmac.new('')
    digest_maker.update('');
    return digest_maker.hexdigest();
