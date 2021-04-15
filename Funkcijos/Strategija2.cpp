#include "My_lib.h"
#include "Funkcijos.h"
#include "Main_h.h"



void filtrasVectorStrategija2 (vector<Studentas> &studentai, vector<Studentas> &nelaimingieji, string file){
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

void filtrasDequeStrategija2 (deque<Studentas> &studentai, deque<Studentas> &nelaimingieji, string file){
	deque<Studentas>::iterator it;
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
sort(studentai.begin(), studentai.end(),compare);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
  auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
  for(it=studentai.begin(); it!=studentai.end(); ++it){
	  if(it->vidurkis<5.00){
		  nelaimingieji.assign(it, studentai.end());
		  studentai.erase(it, studentai.end());
		  break;
	  }
  }
  std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}



void filtrasListStrategija2 (list<Studentas> &studentai, list<Studentas> &nelaimingieji, string file){
    list<Studentas>::iterator it;
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
        studentai.sort(compare);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
    cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
  auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
  for(it=studentai.begin(); it!=studentai.end(); ++it){
	  if(it->vidurkis<5.00){
          nelaimingieji.assign(it, studentai.end());
		  studentai.erase(it, studentai.end());
          break;
	  }
  }
  std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}


