from serpapi import GoogleSearch
from dotenv import find_dotenv, load_dotenv
import os

def getNameFromURL(url):
    params = {
        "engine": "google_lens",
        "url": url,
        "api_key": os.environ.get("api_key")
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    visual_matches = results["visual_matches"]

    
    return results["knowledge_graph"][0]["title"]