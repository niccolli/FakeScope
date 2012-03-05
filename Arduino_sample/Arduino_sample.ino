/*
	This sketch is based on this webpage one.
	http://arms22.blog91.fc2.com/blog-entry-284.html
*/
#define NUMBER_OF_LED 6

int levelLeds[] = {
  7,8,9,10,11,12 
};

void setup(){
  for(int i=0;i<NUMBER_OF_LED;i++){
    pinMode(levelLeds[i],OUTPUT);
    digitalWrite(levelLeds[i],LOW);
  }
  Serial.begin(9600);
}

int ecmPin = 0;

void loop(){
  static int lasEcmLevel = 0;
  int input = analogRead(ecmPin);
  
  Serial.print(millis());
  Serial.print(",");
  Serial.println(input);
  
  input = abs(input - 512);
  
  int ecmLevel = map(input, 50, 350, 0, NUMBER_OF_LED);
  
  lasEcmLevel = ecmLevel;
  
  int pos;
  for(pos=0; pos<lasEcmLevel;pos++){
    digitalWrite(levelLeds[pos],HIGH);
  }
  for(;pos<NUMBER_OF_LED;pos++){
    digitalWrite(levelLeds[pos],LOW);
  }
  
  //delay(5);
}
