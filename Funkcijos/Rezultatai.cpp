#include "My_lib.h"


void vidurkis(Studentas &studentas){
	double temp=0;
	int size = studentas.pazymiai.size();

for(int i=0; i<size; i++){
temp+=studentas.pazymiai[i];
}
studentas.vidurkis=(temp/size*0.4)+(studentas.egzaminas*0.6);
}

void mediana(Studentas &studentas){
	double temp=0;
		int size = studentas.pazymiai.size();
	sort(studentas.pazymiai.begin(), studentas.pazymiai.end());
if(size%2==0){
	temp=(studentas.pazymiai[(size+1)/2]+studentas.pazymiai[(size-1)/2])*0.4/2.0+(studentas.egzaminas*0.6);
}
else{
	temp=(studentas.pazymiai[size/2]*0.4)+(studentas.egzaminas*0.6);
}
studentas.mediana=temp;
}

void sorting (vector<Studentas> &studentai){
	//auto start = std::chrono::high_resolution_clock::now(); auto st=start;
sort(studentai.begin(), studentai.end(),
       [](const Studentas &a, const Studentas &b) {
         return (a.pavarde<b.pavarde);
       });
 //std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  //std::cout << "Sortinimo trukme: "<< diff.count() << " s\n";
}

void filtras (vector<Studentas> &studentai, vector<Studentas> &kietekai, vector<Studentas> &nelaimingieji, string file){
	int Studkiekis=studentai.size();
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
sort(studentai.begin(), studentai.end(),
       [](const Studentas &a, const Studentas &b) {
         return (a.vidurkis>b.vidurkis);
       });
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  std::cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
  auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
  for(int i=0; i<Studkiekis; i++){
	  if(studentai[i].vidurkis>=5.00){
		  kietekai.push_back(studentai[i]);
	  }
	  else {
		  nelaimingieji.push_back(studentai[i]);
	  }
  }
  std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  std::cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}