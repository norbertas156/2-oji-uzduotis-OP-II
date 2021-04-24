#include "Studentas.h"
#include "Studentas.cpp"


void fileIvedimas (vector<Studentas> &studentai, string file){
string eil;
int pazymys;
stringstream my_buffer;
ifstream openf;
openf.open(file+".txt");
while(!openf){
	cout<<"Nerastas "<<file<<".txt failas!"<<endl;
    cin>>file;
    openf.open(file+".txt");
}
my_buffer<<openf.rdbuf();
openf.close();
auto start = std::chrono::high_resolution_clock::now(); auto st=start;
getline(my_buffer, eil);
string vardas, pavarde;
int j=0;
while (getline(my_buffer, eil)){
		j++;
		istringstream is(eil);
		is>>vardas>>pavarde;
		Studentas studentas(vardas, pavarde);
			while(is>>pazymys){
				if(filetikrinimas(pazymys)){
					studentas.setPazymiai(pazymys);	
				}
				else 
				break;		
			}
		if(filetikrinimas(pazymys)){
			studentas.pasalintiPaskutiniPaz();
		studentas.egzaminoPaz(pazymys);
		studentas.setVidurkis();
		studentas.setMediana();
		studentai.push_back(studentas);	 
		}
		else{
			cout<<j<<"-oje eiluteje yra klaida!"<<endl;
		}

		   
}
std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  std::cout <<file <<".txt failo irasu nuskaitymas uztruko: "<< diff.count() << " s\n";
}


void Ivedimas (vector<Studentas> &studentai){
	int size;
	int pazymys;
	string vardas, pavarde;
	unsigned seed =std::chrono::system_clock::now().time_since_epoch().count();
	std::mt19937 generator(seed);
	std::uniform_int_distribution<int> distribution(1, 10);
	cout<<"Iveskite varda"<<endl;
	cin>>vardas;
	cout<<"Iveskite pavarde"<<endl;
	cin>>pavarde;
	Studentas studentas(vardas, pavarde);
	cout<<"Ar zinote namu darbu skaiciu? (t-taip, bet kokia kita raide-ne)"<<endl;
	string ndskz=Rtikrinimas();
	if(ndskz=="t"){
		cout<<"Iveskite namu darbu skaiciu"<<endl;
			cin>>size;
			while (size<1){
			cin.clear();
			cin.ignore();
			cout<<"Blogas Ivestis. Prasome ivesti skaciu didesni uz 1!"<<endl;
			cin>>size;
			}
			cout<<"Ar norite namu darbus ivesti ranka? (t-taip, bet kokia kita raide-ne)"<<endl;
			string ndskr =Rtikrinimas();
			if(ndskr=="t"){
				cout<<"Iveskite pazymius"<<endl;
				for(int j=0; j<size; j++){
                    cout<<j+1<<"-asis namu darbas: ";
					pazymys=Sktikrinimas();
                    "\n";
					studentas.setPazymiai(pazymys);
				}
				cout<<"Iveskite egzamino rezultata"<<endl;
				studentas.egzaminoPaz(Sktikrinimas());	
				}
			else{
				cout<<"Atsitiktinai sugeneruoti namu darbai: ";
				for(int j=0; j<size; j++){
                    int a=distribution(generator);
					studentas.setPazymiai(a);
					cout<<a<<" ";
					}
				studentas.egzaminoPaz(distribution(generator));
				cout<<"\nAtsitiktinai sugeneruotas egzamino rezultatas: "<<studentas.getEgzaminas()<<endl;
				}
				studentas.setVidurkis();
				studentas.setMediana();
				studentai.push_back(studentas);
			}

	else{
		int pazymys;
		size=0;
		cout<<"Noredami nutraukti ivedima iveskite 0!"<<endl;
		cout<<size+1<<"-asis namu darbas"<<endl;
		studentas.setPazymiai(Sktikrinimas());
		while(true){
			size++;
			cout<<size+1<<"-asis namu darbas"<<endl;
			pazymys=Paztikrinimas();
			if(pazymys==0){
				break;
			}
			else{
				studentas.setPazymiai(pazymys);
			}
				}
				size--;
				cout<<"Iveskite egzamino rezultata"<<endl;
				studentas.egzaminoPaz(Sktikrinimas());	
							
	}
	studentai.push_back(studentas);
	cout<<"Ar norite ivesti dar viena studenta?(t-taip, bet kokia kita raide-ne)"<<endl;
}

void RandomIvedimas (int n){
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
unsigned seed =std::chrono::system_clock::now().time_since_epoch().count();
std::mt19937 generator(seed);
std::uniform_int_distribution<int> distribution(1, 10);
std::uniform_int_distribution<int> FGdistribution(5, 15);
string studentaiFile="studentai"+std::to_string(n);
ofstream fd (studentaiFile+".txt");
fd<<left<<setw(15)<<"Vardas"<<left<<setw(20)<<"Pavarde";
int GradeCount=FGdistribution(generator);
for (int i=0; i<GradeCount; i++){
	fd<<left<<setw(15)<<"ND"+std::to_string(i+1);
}
fd<<left<<setw(15)<<"Egz."<<endl;
for(int i=0; i<n; i++){
	fd<<left<<setw(15)<<"Vardas"+std::to_string(i+1)<<left<<setw(20)<<"Pavarde"+std::to_string(i+1);
	for(int j=0; j<GradeCount; j++){
		fd<<left<<setw(15)<<distribution(generator);
	}
	fd<<left<<setw(15)<<distribution(generator)<<endl;
}
fd.close();
 std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  std::cout << "Failo sukurimas uztruko: "<< diff.count() << " s\n";
}

template <class Z>
void BenchmarkIvedimas (Z &studentai, string file){
string eil, vardas, pavarde;
int pazymys;
stringstream my_buffer;
ifstream openf;
try{
	openf.open(file+".txt");
  if(!openf){
    throw file;
  }
 
my_buffer<<openf.rdbuf();
openf.close();
 
 auto start = std::chrono::high_resolution_clock::now(); auto st=start;
getline(my_buffer, eil);
int j=0;
while (getline(my_buffer, eil)){
		j++;
		istringstream is(eil);
		is>>vardas>>pavarde;
		Studentas studentas(vardas, pavarde);
			while(is>>pazymys){
				if(filetikrinimas(pazymys)){
					studentas.setPazymiai(pazymys);	
				}
				else 
				break;		
			}
		if(filetikrinimas(pazymys)){
			studentas.pasalintiPaskutiniPaz();
		studentas.egzaminoPaz(pazymys);
		studentas.setVidurkis();
		studentas.setMediana();
		studentai.push_back(studentas);
		}
		else{
			throw j;
		}   
}
std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  std::cout <<file <<".txt failo irasu nuskaitymas uztruko: "<< diff.count() << " s\n";
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