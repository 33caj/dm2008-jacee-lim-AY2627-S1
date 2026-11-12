// DM2008 — Activity 8a
// Type 2: On/Off Control (10 min)
//
// Upload this sketch to make your LED blink using digitalWrite().
// HIGH turns the LED on, LOW turns it off.
// delay() pauses the program for a set time in milliseconds.
//
// Try these:
// - What happens if you change the delay time?
// - What if you remove one of the delay() lines entirely?
// - How might you make the blink feel alive or rhythmic?

int ledPin = 13; // the pin your LED is connected to

void setup() {
  pinMode(ledPin, OUTPUT); // tell Arduino this pin will send signals, not receive them
}

void loop() {
  digitalWrite(ledPin, HIGH); // LED on
  delay(500);
  digitalWrite(ledPin, LOW);  // LED off
  delay(500);
}