#include "My_lib.h"
#include "Funkcijos.h"


void fileIvedimas (vector <Studentas> &studentai, string file){

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
auto start = std::chrono::high_resolution_clock::now(); auto st=start;
my_buffer<<openf.rdbuf();
openf.close();
 std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  std::cout << "Failo nuskaitymas į buferį užtruko: "<< diff.count() << " s\n";
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
			cout<<j<<"-oje eiluteje yra klaida!"<<endl;
		}

		   
}
diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  std::cout << "Buferio padalijimas į eilučių vektorių užtruko: "<< diff.count() << " s\n";
}

void Ivedimas(Studentas &studentas){
	int size;
	int pazymys;
	unsigned seed =std::chrono::system_clock::now().time_since_epoch().count();
	std::mt19937 generator(seed);
	std::uniform_int_distribution<int> distribution(1, 10);
	cout<<"Iveskite varda"<<endl;
	cin>>studentas.vardas;
	cout<<"Iveskite pavarde"<<endl;
	cin>>studentas.pavarde;
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
					studentas.pazymiai.push_back(pazymys);
				}
				cout<<"Iveskite egzamino rezultata"<<endl;
				studentas.egzaminas=Sktikrinimas();	
				}
			else{
				cout<<"Atsitiktinai sugeneruoti namu darbai: ";
				for(int j=0; j<size; j++){
                    int a=distribution(generator);
					studentas.pazymiai.push_back(a);
					cout<<a<<" ";
					}
				studentas.egzaminas=distribution(generator);
				cout<<"\nAtsitiktinai sugeneruotas egzamino rezultatas: "<<studentas.egzaminas<<endl;
				}
			}

	else{
		int pazymys;
		size=0;
		cout<<"Noredami nutraukti ivedima iveskite 0!"<<endl;
		cout<<size+1<<"-asis namu darbas"<<endl;
		studentas.pazymiai.push_back(Sktikrinimas());
		while(true){
			size++;
			cout<<size+1<<"-asis namu darbas"<<endl;
			pazymys=Paztikrinimas();
			if(pazymys==0){
				break;
			}
			else{
				studentas.pazymiai.push_back(pazymys);
			}
				}
				size--;
				cout<<"Iveskite egzamino rezultata"<<endl;
				studentas.egzaminas=Sktikrinimas();	
							
	}
	
	cout<<"Ar norite ivesti dar viena studenta?(t-taip, bet kokia kita raide-ne)"<<endl;
}