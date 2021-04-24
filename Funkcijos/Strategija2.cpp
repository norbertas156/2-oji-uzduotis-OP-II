#include "My_lib.h"
#include "Funkcijos.h"
#include "Main_h.h"
#include "Studentas.h"



void filtrasVectorStrategija2 (vector<Studentas> &studentai, vector<Studentas> &nelaimingieji, string file){
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

void filtrasDequeStrategija2 (deque<Studentas> &studentai, deque<Studentas> &nelaimingieji, string file){
	deque<Studentas>::iterator it;
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
  sortByVidurkis(studentai);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
  auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
  for(it=studentai.begin(); it!=studentai.end(); ++it){
	  if(it->galVidurkis()<5.00){
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
        sortByVidurkisList(studentai);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
    cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
  auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
  for(it=studentai.begin(); it!=studentai.end(); ++it){
	  if(it->galVidurkis()<5.00){
          nelaimingieji.assign(it, studentai.end());
		  studentai.erase(it, studentai.end());
          break;
	  }
  }
  std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}


