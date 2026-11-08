import os
import json
import requests
from google.oauth2 import service_account
import google.auth.transport.requests

CREDENTIALS_FILE = "service_account.json"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

URLS_TO_UPDATE = [
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/german_lost_airport/Resurrecting RAF Gatow.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/german_lost_airport/reconstructing-johannisthal-adlershof-1928--digitizing-the-birthplace-of-german-aviation-in-a03b9eecc201.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/german_lost_airport/preserving-aviation-s-birthplaces-in-x-plane-12-johannisthal-and-devau-airfields-bffc4f9610ca.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/german_lost_airport/index.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/post_ussr/resurrecting-forgotten-wings-the-historic-old-vladivostok-airfield-ru-0536-in-modern-flight-4c850d2d06ec.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/post_ussr/the-hidden-cold-war-history-of-vladivostok-international-airport-uhww-4b7175a799bb.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/post_ussr/unbundling-knevichi-the-evolution-of-lake-springs-heliport-ozerne-klyuchi-decf53a117c8.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/post_ussr/the-lost-wings-of-belarus-digitally-restoring-minsk-1-airport-ummm-in-x-plane-12-8430b5e356ab.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/post_ussr/guarding-the-pacific-frontier-mount-varginar-and-cape-markovsky-heliports-f2394506a575.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/post_ussr/recreating-primorsky-krai-in-x-plane-12-far-east-air-bases-and-regional-hubs-be360fe0dafd.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/post_ussr/project-log-preserving-belorussian-aviation-history-in-x-plane-12--minsk-1-and-machulishchy-air-87092d77bb00.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/post_ussr/index.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/indonesia_dlc/index.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/indonesia_dlc/reconstructing-a-lost-airport-in-a-digital-world-the-story-of-kemayoran-9035b67f5258.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/indonesia_dlc/engineering-the-gateway-reconstructing-the-kemayoran-main-terminal-geometry-59f0161fa279.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/indonesia_dlc/project-jabodetabek-enhancing-rumpin-airfield-and-west-java-s-aviation-mesh-in-x-plane-12-e2ba215e818e.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/indonesia_dlc/reconstructing-nusantara-walk--fixing-spatial-shifts-and-forest-hydrology-in-x-plane-12-0a7447271c6d.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/indonesia_dlc/the-hidden-runway-in-the-paddy-fields-lanud-gorda-tangerang-in-x-plane-12-edb2c34d92f6.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/indonesia_dlc/-xp12-project-jabodetabek-lanud-rumpin--satradar-211--penataan-mesh-regional-1985f016eeca.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/wed_dev_tools/index.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/wed_dev_tools/bare-metal-pbr-ground-polygons-revolutionizing-x-plane-12-surface-engineering-7585cdfb7d24.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/free_orthophotos/index.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/free_orthophotos/draft_resurrecting-berlin-tempelhof-eddi--reactivating-an-alternate-2020-operational-hub-in-x-plane-12-5e842890da7b.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/free_orthophotos/resurrecting-berlin-tegel-eddt--reactivating-ghost-navdata-and-cold-war-aviation-heritage-in-6099875c425e.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/ortho/europe/DE/DE1/EDDI_2020.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/ortho/europe/DE/DE1/EDDT_2019.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/ortho/europe/DE/DE1.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/ortho/europe_ortho.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/blog/blog.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/see-also.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/about_me.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/post_ussr_dlc/post_ussr_dlc.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/WED_DEV_Folder/WED_Dev_Tools.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/index.html",
"https://okb1creativedesignbureau-spec.github.io/xplane_product_of_okb1creativedesignbureau/ortho/europe/DE/DE1/EDDB_2020.html",
]

def notify_google():
    # 1. Try local file, fallback to GitHub Secret environment variable
    if os.path.exists(CREDENTIALS_FILE):
        credentials = service_account.Credentials.from_service_account_file(
            CREDENTIALS_FILE, scopes=SCOPES
        )
    elif "GCP_SERVICE_ACCOUNT_KEY" in os.environ:
        info = json.loads(os.environ["GCP_SERVICE_ACCOUNT_KEY"])
        credentials = service_account.Credentials.from_service_account_info(
            info, scopes=SCOPES
        )
    else:
        print("Error: No credentials found in file or environment variables.")
        return

    # 2. Authenticate
    request = google.auth.transport.requests.Request()
    credentials.refresh(request)
    access_token = credentials.token

    # 3. Request re-indexing
    endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish"

    for url in URLS_TO_UPDATE:
        payload = {
            "url": url,
            "type": "URL_UPDATED"
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }

        response = requests.post(endpoint, json=payload, headers=headers)
        if response.status_code == 200:
            print(f"Successfully notified Google: {url}")
        else:
            print(f"Failed for {url}: {response.status_code} - {response.text}")

if __name__ == "__main__":
    notify_google()
