# pip install requests
# pip install beautifulsoup4
import requests
from bs4 import BeautifulSoup
import json
import re


def scrape_data(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.3'}
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print("Failed to retrieve the webpage.")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')

    items = soup.find_all('div', {'class': 'review-left'})

    data_list = []

    for item in items:
        
        # Fetch item name
        name_tag = item.find('h3', {'class': 'title'})
        review = name_tag.text if name_tag else 'N/A'
        link = name_tag.get('href', 'N/A') if name_tag else 'N/A'


        data_list.append({
            'review': review,
        })

    return data_list


if __name__ == "__main__":
    url = "https://www.hsn.com/products"
    scraped_data = scrape_data(url)

    if scraped_data:
        print(json.dumps(scraped_data, indent=4))
    else:
        print("No data scraped.")
