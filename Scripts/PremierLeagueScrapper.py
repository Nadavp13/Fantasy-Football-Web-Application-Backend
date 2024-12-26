from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import time
import os

# Set up the Chrome options to prevent the browser from opening
chrome_options = Options()
#chrome_options.add_argument('--headless')  # Run headlessly

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

# Wait for the page to load completely (optional, depends on the site)
driver.implicitly_wait(5)

# Find the 'sort' select element
select_element = driver.find_element(By.ID, "sort")

# Create a Select object
select_object = Select(select_element)

# Select the "Round points" option
select_object.select_by_value("event_points")

time.sleep(1)
data = []
for _ in range(24):

    # Find the table using its class name
    table = driver.find_element(By.CSS_SELECTOR, '.Table-sc-ziussd-1.ElementTable-sc-1v08od9-0.iPaulP.OZmJL')

    # Find all rows in the table body
    rows = table.find_elements(By.CSS_SELECTOR, '.ElementTable__ElementRow-sc-1v08od9-3.kGMjuJ')

    # Loop through each row and extract the data
    for row in rows:
        cols = row.find_elements(By.TAG_NAME, 'td')

        # Check if there are enough columns to extract data
        if len(cols) >= 7:
            player_name = cols[1].text.strip()
            cost = cols[2].text.strip()
            selection = cols[3].text.strip()
            form = cols[4].text.strip()
            points = cols[5].text.strip()
            extra = cols[6].text.strip()

            # Append to the list as a dictionary
            data.append({
                'Player': player_name,
                'Cost': cost,
                'Selection': selection,
                'Form': form,
                'Points': points,
                'Extra': extra
            })

    try:
        # Find the button element using CSS selector
        next_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable(
                (By.XPATH, "//button[@class='PaginatorButton__Button-sc-xqlaki-0 cmSnxm' and contains(., 'Next')]")))

        # Click the button
        next_button.click()
        print("Clicked 'Next' button successfully!")


    except Exception as e:

        # Handle potential exceptions

        if "NoSuchElementException" in str(e):

            print("Button element not found. Pagination might be on the last page already.")

        else:

            print(f"An error occurred while clicking 'Next': {e}")

# Print the extracted data
print(len(data))
for player_data in data:
    print(player_data)

# Close the WebDriver after scraping
driver.quit()