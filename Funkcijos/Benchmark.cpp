#include "My_lib.h"
#include "Funkcijos.h"
#include "Main_h.h"

bool compare (const Studentas &studentas1, const Studentas &studentas2){
return studentas1.vidurkis>studentas2.vidurkis;
}

template <class X>
void BenchmarkIvedimas (X &studentai, string file){
string eil;
int pazymys;
stringstream my_buffer;
ifstream openf;
try{
	openf.open(file+".txt");
  if(!openf){
    throw file;
  }
  auto start = std::chrono::high_resolution_clock::now(); auto st=start;
my_buffer<<openf.rdbuf();
openf.close();
 std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  std::cout <<file <<".txt failo irasu nuskaitymas uztruko: "<< diff.count() << " s\n";

getline(my_buffer, eil);
Studentas studentas;
int j=0;
while (getline(my_buffer, eil)){
		studentas.pazymiai.clear();
		j++;
		istringstream is(eil);
		is>>studentas.vardas>>studentas.pavarde;
			while(is>>pazymys){
				if(filetikrinimas(pazymys)){
					studentas.pazymiai.push_back(pazymys);	
				}
				else 
				break;		
			}
		if(filetikrinimas(pazymys)){
			studentas.pazymiai.pop_back();
		studentas.egzaminas=pazymys;
		vidurkis(studentas);
		mediana(studentas);
		studentai.push_back(studentas);	 
		}
		else{
			throw j;
		}   
}
}
catch(string file){
cout<<"Neegzistuoja "<<file<<".txt "<<"failas. Duomenu spartos analize nutraukiama"<<endl;
exit(0);
}
catch(int j){
  cout<<"Faile "<<file<<".txt "<<j+1<<"-eiluteje yra klaida. Duomenu spartos analize nutraukiama"<<endl;
  exit(0);
}

}

void filtrasVector (vector<Studentas> &studentai, vector<Studentas> &kietekai, vector<Studentas> &nelaimingieji, string file){
	int Studkiekis=studentai.size();
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
sort(studentai.begin(), studentai.end(),compare);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
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
  cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}

void filtrasDeque (deque<Studentas> &studentai, deque<Studentas> &kietekai, deque<Studentas> &nelaimingieji, string file){
	int Studkiekis=studentai.size();
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
sort(studentai.begin(), studentai.end(),compare);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
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
  cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}



void filtrasList (list<Studentas> &studentai, list<Studentas> &kietekai, list<Studentas> &nelaimingieji, string file){
    list<Studentas>::iterator it;
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
        studentai.sort(compare);
	    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
    cout <<file <<".txt irasu Sortinimo trukme: "<< diff.count() << " s\n";
  auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
  for(it=studentai.begin(); it!=studentai.end(); ++it){
	  if(it->vidurkis<5.00){
		  kietekai.assign(studentai.begin(), it);  
          nelaimingieji.assign(it, studentai.end());
          break;
	  }
  }
  std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file <<".txt irasu dalijimo i kietekus ir nelaiminguosius trukme: "<< diff2.count() << " s\n";
}

void benchmark (int pasirinkimas){
string file;
file="studentai1000";
if(pasirinkimas == 1){
    auto start = std::chrono::high_resolution_clock::now(); auto st=start;
    vector<Studentas> studentai;
    vector<Studentas> kietekai;
    vector<Studentas> nelaimingieji;
    for(int i=0; i<5; i++){
    BenchmarkIvedimas(studentai, file);
    filtrasVector(studentai,kietekai, nelaimingieji, file);
    FiltroIsvedimas(kietekai, nelaimingieji, file);
    file=file+"0";
    studentai.clear();
    kietekai.clear();
    nelaimingieji.clear();
    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start;
    cout<<"Programos trukme: "<<diff.count()<<endl;
    cout<<""<<endl; 
    }  
}
else if(pasirinkimas == 2){
    auto start = std::chrono::high_resolution_clock::now(); auto st=start;
    deque<Studentas> studentai;
    deque<Studentas> kietekai;
    deque<Studentas> nelaimingieji;
    for(int i=0; i<5; i++){
    BenchmarkIvedimas(studentai, file);
    filtrasDeque(studentai,kietekai, nelaimingieji, file);
    FiltroIsvedimas(kietekai, nelaimingieji, file);
    file=file+"0";
    studentai.clear();
    kietekai.clear();
    nelaimingieji.clear();
    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start;
    cout<<"Programos trukme: "<<diff.count()<<endl;
    cout<<""<<endl; 
    }
}
else {
    auto start = std::chrono::high_resolution_clock::now(); auto st=start;
    list<Studentas> studentai;
    list<Studentas> kietekai;
    list<Studentas> nelaimingieji; 
    for(int i=0; i<5; i++){
    BenchmarkIvedimas(studentai, file);
    filtrasList(studentai,kietekai, nelaimingieji, file);
    ListIsvedimas(kietekai, nelaimingieji, file);
    file=file+"0";
    studentai.clear();
    kietekai.clear();
    nelaimingieji.clear();
    std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start;
    cout<<"Programos trukme: "<<diff.count()<<" s"<<endl;
    cout<<""<<endl;
    }
}
}

