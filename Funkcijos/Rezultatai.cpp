#include "My_lib.h"
#include "Funkcijos.h"
#include "Studentas.h"


double vidurkis(vector<int> &pazymiai, int egzaminas){
	double temp=0;
	double size = pazymiai.size();
	double suma = std::accumulate(pazymiai.begin(), pazymiai.end(), 0);
	temp=((suma/size*0.4)+(egzaminas*0.6));
return temp;
}

double mediana(vector<int> &pazymiai, int egzaminas){
	double temp=0;
		int size = pazymiai.size();
	sort(pazymiai.begin(), pazymiai.end());
if(size%2==0){
	temp=(pazymiai[(size+1)/2]+pazymiai[(size-1)/2])*0.4/2.0+(egzaminas*0.6);
}
else{
	temp=(pazymiai[size/2]*0.4)+(egzaminas*0.6);
}
return temp;
}


void filtras (vector<Studentas> &studentai, vector<Studentas> &nelaimingieji, string file){
	vector<Studentas>::iterator it;
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
	sortByVidurkis(studentai);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
  auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
  for(it=studentai.begin(); it!=studentai.end(); ++it){
	  if(it->galVidurkis()<5){
		  nelaimingieji.assign(it, studentai.end());
		  studentai.erase(it, studentai.end());
		  break;
	  }
  }
		  	  
  std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}
