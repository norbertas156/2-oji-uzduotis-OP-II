#include "My_lib.h"
#include "Funkcijos.h"


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


void filtras (vector<Studentas> &studentai, vector<Studentas> &nelaimingieji, string file){
	vector<Studentas>::iterator it;
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
sort(studentai.begin(), studentai.end(),compare);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
  auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
  it=std::find_if(studentai.begin(), studentai.end(), Find);
		  nelaimingieji.assign(it, studentai.end());
		  studentai.erase(it, studentai.end());	  
  std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}
