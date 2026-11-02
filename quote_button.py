"""Run with python3 quote_button.py to open the offline quote button."""

from pathlib import Path
import webbrowser


def main():
    page = Path(__file__).with_name("quote_button.html").resolve()
    if not page.is_file():
        raise SystemExit("Keep quote_button.html in the same folder as this script.")
    if not webbrowser.open(page.as_uri()):
        print(f"Open this file in your browser: {page}")


if __name__ == "__main__":
    main()
