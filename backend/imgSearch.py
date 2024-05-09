from serpapi import GoogleSearch
from dotenv import find_dotenv, load_dotenv

def getNameFromURL(url):
    params = {
        "engine": "google_lens",
        "url": url,
        "api_key": os.environ.get("api_key")
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    visual_matches = results["visual_matches"]

    # print(visual_matches[0]["title"])
    # print(results["knowledge_graph"][0]["title"])
    
    return results["knowledge_graph"][0]["title"]