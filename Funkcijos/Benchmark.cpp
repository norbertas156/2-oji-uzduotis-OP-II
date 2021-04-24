#include "My_lib.h"
#include "Funkcijos.h"
#include "Main_h.h"
#include "Strategija2.cpp"
#include "Studentas.h"

void filtrasVector (vector<Studentas> &studentai, vector<Studentas> &kietekai, vector<Studentas> &nelaimingieji, string file){
  vector<Studentas>::iterator it;
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
  sortByVidurkis(studentai);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
  auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
    for(it=studentai.begin(); it!=studentai.end(); ++it){
	  if(it->galVidurkis()<5.00){
		  kietekai.assign(studentai.begin(), it);  
      nelaimingieji.assign(it, studentai.end());
      break;
	  }
  }
  std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}

void filtrasDeque (deque<Studentas> &studentai, deque<Studentas> &kietekai, deque<Studentas> &nelaimingieji, string file){
  deque<Studentas>::iterator it;
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
  sortByVidurkis(studentai);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
  auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
   for(it=studentai.begin(); it!=studentai.end(); ++it){
	  if(it->galVidurkis()<5.00){
		  kietekai.assign(studentai.begin(), it);  
      nelaimingieji.assign(it, studentai.end());
      break;
	  }
  }
  std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}



void filtrasList (list<Studentas> &studentai, list<Studentas> &kietekai, list<Studentas> &nelaimingieji, string file){
    list<Studentas>::iterator it;
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
  sortByVidurkisList(studentai);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
    cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
  auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
  for(it=studentai.begin(); it!=studentai.end(); ++it){
	  if(it->galVidurkis()<5.00){
		  kietekai.assign(studentai.begin(), it);  
          nelaimingieji.assign(it, studentai.end());
          break;
	  }
  }
  std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}

void benchmark (int pasirinkimas, int strategija){
string file;
file="studentai1000";
if(strategija == 1){
if(pasirinkimas == 1){
    vector<Studentas> studentai;
    vector<Studentas> kietekai;
    vector<Studentas> nelaimingieji;
    for(int i=0; i<5; i++){
    auto start = std::chrono::high_resolution_clock::now(); auto st=start;
    BenchmarkIvedimas(studentai, file);
    filtrasVector(studentai,kietekai, nelaimingieji, file);
    FiltroIsvedimas(kietekai, nelaimingieji, file);
    file=file+"0";
    if(i!=4){
    studentai.clear();
    kietekai.clear();
    nelaimingieji.clear();
    }
    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start;
    cout<<"Programos trukme: "<<diff.count()<<endl;
    cout<<""<<endl; 
    }  
}
else if(pasirinkimas == 2){ 
    deque<Studentas> studentai;
    deque<Studentas> kietekai;
    deque<Studentas> nelaimingieji;
    for(int i=0; i<5; i++){
    auto start = std::chrono::high_resolution_clock::now(); auto st=start;
    BenchmarkIvedimas(studentai, file);
    filtrasDeque(studentai,kietekai, nelaimingieji, file);
    FiltroIsvedimas(kietekai, nelaimingieji, file);
    file=file+"0";
    if(i!=4){
    studentai.clear();
    kietekai.clear();
    nelaimingieji.clear();
    }
    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start;
    cout<<"Programos trukme: "<<diff.count()<<endl;
    cout<<""<<endl; 
    }
}
else {
    list<Studentas> studentai;
    list<Studentas> kietekai;
    list<Studentas> nelaimingieji; 
    for(int i=0; i<5; i++){
    auto start = std::chrono::high_resolution_clock::now(); auto st=start;
    BenchmarkIvedimas(studentai, file);
    filtrasList(studentai,kietekai, nelaimingieji, file);
    ListIsvedimas(kietekai, nelaimingieji, file);
    file=file+"0";
    if(i!=4){
    studentai.clear();
    kietekai.clear();
    nelaimingieji.clear();
    }
    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start;
    cout<<"Programos trukme: "<<diff.count()<<" s"<<endl;
    cout<<""<<endl;
    }

}
}
else{
if(pasirinkimas == 1){
    vector<Studentas> studentai;
    vector<Studentas> nelaimingieji;
    for(int i=0; i<5; i++){
    auto start = std::chrono::high_resolution_clock::now(); auto st=start;
    BenchmarkIvedimas(studentai, file);
    filtrasVectorStrategija2(studentai, nelaimingieji, file);
    FiltroIsvedimas(studentai, nelaimingieji, file);
    file=file+"0";
    if(i!=4){
    studentai.clear();
    nelaimingieji.clear();
    }
    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start;
    cout<<"Programos trukme: "<<diff.count()<<endl;
    cout<<""<<endl; 
    }  
}
else if(pasirinkimas == 2){ 
    deque<Studentas> studentai;
    deque<Studentas> nelaimingieji;
    for(int i=0; i<5; i++){
    auto start = std::chrono::high_resolution_clock::now(); auto st=start;
    BenchmarkIvedimas(studentai, file);
    filtrasDequeStrategija2(studentai, nelaimingieji, file);
    FiltroIsvedimas(studentai, nelaimingieji, file);
    file=file+"0";
    if(i!=4){
    studentai.clear();
    nelaimingieji.clear();
    }
    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start;
    cout<<"Programos trukme: "<<diff.count()<<endl;
    cout<<""<<endl; 
    }
}
else {
    list<Studentas> studentai;
    list<Studentas> nelaimingieji; 
    for(int i=0; i<5; i++){
    auto start = std::chrono::high_resolution_clock::now(); auto st=start;
    BenchmarkIvedimas(studentai, file);
    filtrasListStrategija2(studentai, nelaimingieji, file);
    ListIsvedimas(studentai, nelaimingieji, file);
    file=file+"0";
    if(i!=4){
    studentai.clear();
    nelaimingieji.clear();
    }
    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start;
    cout<<"Programos trukme: "<<diff.count()<<" s"<<endl;
    cout<<""<<endl;
    }

}
}
}


