from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import time
import json
import os

# Set up the Chrome options to prevent the browser from opening
chrome_options = Options()
# chrome_options.add_argument('--headless')  # Run headlessly

# Path to your chromedriver.exe
chromedriver_path = r"C:\Program Files\Chromium\chromedriver-win64\chromedriver.exe"  # Update this with the actual path to your chromedriver

# Set up the WebDriver with your existing chromedriver.exe
driver = webdriver.Chrome(service=Service(chromedriver_path), options=chrome_options)

# URL of the page to scrape
url = 'https://fantasy.premierleague.com/statistics'

# Open the webpage
driver.get(url)

# Wait for the cookie consent modal and click the "Accept All Cookies" button
try:
    # Wait until the "Accept All Cookies" button is visible and clickable
    accept_cookies_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, 'onetrust-accept-btn-handler'))
    )
    accept_cookies_button.click()
    print("Accepted cookies.")
except Exception as e:
    print(f"Cookie acceptance failed: {e}")

# Wait for the page to load completely
driver.implicitly_wait(5)
"""
# Find the 'sort' select element
select_element = driver.find_element(By.ID, "sort")

# Create a Select object
select_object = Select(select_element)

# Select the "Round points" option
select_object.select_by_value("event_points")
"""
time.sleep(1)

# Position mapping for the data extraction
position_mapping = {
    "Defender": "DEF",
    "Midfielder": "MID",
    "Forward": "FWD",
    "Goalkeeper": "GK"
}

# List to store player data
player_data_list = []

# Function to process player data on the current page
def process_players_on_page():
    # Find all player rows in the table
    player_rows = driver.find_elements(By.CSS_SELECTOR, ".ElementTable__ElementRow-sc-1v08od9-3.kGMjuJ")
    print(f"Found {len(player_rows)} players on the page.")

    for index, row in enumerate(player_rows):
        try:
            # Find the button to open the player dialog
            player_button = row.find_element(By.CSS_SELECTOR, ".ElementDialogButton__StyledElementDialogButton-sc-1vrzlgb-0.irVYoY")
            player_button.click()
            print(f"Clicked on player {index + 1}.")

            # Extract data from the player dialog
            name = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "h2.styles__ElementHeading-sc-ahs9zc-5.gwmHpL"))
            ).text.strip()
            position = driver.find_element(By.CSS_SELECTOR, "span.styles__ElementTypeLabel-sc-ahs9zc-4.kDMSIW").text.strip()
            team = driver.find_element(By.CSS_SELECTOR, "div.styles__Club-sc-ahs9zc-6.eiknRS").text.strip()
            image_element = driver.find_element(By.CSS_SELECTOR, "img.styles__Img-sc-ahs9zc-7.klUaQC")
            image_url = image_element.get_attribute("srcset").split(",")[0].strip().replace("//", "").split(" ")[0]
            price = driver.find_elements(By.CSS_SELECTOR, "div.styles__StatValue-sc-1tsp201-2.fgGEXH")[0].text.strip()

            table = driver.find_element(By.CSS_SELECTOR, ".styles__TableWrap-sc-ahs9zc-14 .Table-sc-ziussd-1")

            rows = table.find_elements(By.TAG_NAME, "tr")
            pts_list = []

            for r in rows[1:-2]:  # rows[1:-2] to skip the header and the last two rows
                # Find all columns (td) in the row
                cols = r.find_elements(By.TAG_NAME, "td")
                if len(cols) > 2:  # Ensure the row has enough columns
                    pts = cols[2].text  # The Pts column is the 4th column (index 3)
                    pts_list.append(pts)

            # Flip the points list for this player
            flipped_points = pts_list[::-1]

            # Map position to desired format
            position = position_mapping.get(position, "Unknown")

            # Store player data with the flipped points
            player_data = {
                "name": name,
                "league" : "English Premier League",
                "team": team,
                "price": price,
                "totalPoints": sum(int(num) for num in flipped_points),
                "weeklyPoints": flipped_points,
                "position": position,
                "image": image_url,
                  # Add the flipped points list here
            }
            player_data_list.append(player_data)

            # Find the close button and click it
            close_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, ".Dialog__CloseButton-sc-5bogmv-1.cgQMVU"))
            )
            close_button.click()
            print(f"Closed player dialog for player {index + 1}.")

        except Exception as e:
            print(f"An error occurred with player {index + 1}: {e}")

# Function to click "Next" and handle pagination
def go_to_next_page():
    try:
        # Find the "Next" button
        next_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@class='PaginatorButton__Button-sc-xqlaki-0 cmSnxm' and contains(., 'Next')]"))
        )
        next_button.click()
        print("Clicked 'Next' button successfully!")
        driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(2)  # Wait for the next page to load
    except Exception as e:
        print(f"Error finding or clicking 'Next' button: {e}")
        return False  # No more pages

# Start processing and continue until no "Next" button is found
for i in range(24):
    process_players_on_page()
    if i < 23:
        go_to_next_page()

# Print the extracted player data
print(f"Extracted data for {len(player_data_list)} players:")
for player in player_data_list:
    print(player)

file_path = "english_premier_league_players_data.json"

with open(file_path, "w") as json_file:
    json.dump(player_data_list, json_file, indent=4)

print(f"Data has been saved to {file_path}")

# Close the WebDriver after scraping
driver.quit()
