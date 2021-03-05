#include "My_lib.h"

struct Studentas{
string vardas;
string pavarde;
double vidurkis;
int egzaminas;
double mediana;
vector <int>pazymiai;
};

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
string Rtikrinimas (){
string n;
cin>>n;
while (cin.fail()){
	cin.clear();
	cin.ignore();
	cout<<"Blogas Ivestis. Iveskite (t-taip arba bet kokia kita raide jei ne)"<<endl;
	cin>>n;
}
return n;
}

int Sktikrinimas(){
int n;
cin>>n;
while (n<1 || n>10){
	cout<<"Bloga Ivestis. Prasome ivesti skaciu tarp 1 ir 10!"<<endl;
	cin.clear();
	cin.ignore();	
	cin>>n;
	
}
return n;
}

int Paztikrinimas(){
int n;
cin>>n;
while (n<0 || n>10){
	cin.clear();
	cin.ignore();
	cout<<"Bloga Ivestis. Prasome ivesti skaciu tarp 1 ir 10 arba jei norite nutraukti 0!"<<endl;
	cin>>n;
}
return n;
}
bool filetikrinimas(int n){
if(n>0 && n<11){
	return true;
}
else return false;
}

void sorting (vector<Studentas> &studentai){
	for (int i=0; i<studentai.size()-1; i++){
		for(int j=i+1; j<studentai.size(); j++){
			if(studentai[i].pavarde>studentai[j].pavarde){
				swap(studentai[i], studentai[j]);
		}
			
	}
}
}


void fileIvedimas (vector <Studentas> &studentai, string file){

string eil;
int pazymys;
stringstream my_buffer;
auto start = std::chrono::high_resolution_clock::now(); auto st=start;
ifstream openf (file+".txt");
if(!openf){
	cout<<"Nerastas"<<file<<".txt failas!"<<endl;
	exit(1);
}
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
		cout<<"Iveskite pazymiu skaiciu"<<endl;
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
					pazymys=Sktikrinimas();
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
				cout<<"/n Atsitiktinai sugeneruotas egzamino rezultatas: "<<studentas.egzaminas<<endl;
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


void Isvedimas(vector<Studentas> &studentas){
	int Studkiekis=studentas.size();
cout<<"Norite galutini pazymi vidurkiu(v), mediana(m) ar abiem(bet koks simbolis)"<<endl;
string galutinis=Rtikrinimas();
if(galutinis=="v"){
	cout<<left<<setw(15)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
cout<<"------------------------------------------------------------------"<<endl;
for(int i=0; i<Studkiekis; i++){
	cout<<left<<setw(15)<<studentas[i].pavarde;
	cout<<left<<setw(15)<<studentas[i].vardas;
	cout<<left<<setw(15)<<fixed<<setprecision(2)<<studentas[i].vidurkis<<endl;
}
}
else if(galutinis=="m"){
	cout<<left<<setw(15)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(med.)"<<endl;
cout<<"------------------------------------------------------------------"<<endl;
for(int i=0; i<Studkiekis; i++){
	cout<<left<<setw(15)<<studentas[i].pavarde;
	cout<<left<<setw(15)<<studentas[i].vardas;
	cout<<left<<setw(15)<<fixed<<setprecision(2)<<studentas[i].mediana<<endl;
}
}
else
{
	cout<<left<<setw(15)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(16)<<"Galutinis(vid.)"<<left<<setw(5)<<"Galutinis(med.)"<<endl;
    cout<<"------------------------------------------------------------------"<<endl;
        for(int i=0; i<Studkiekis; i++){
	    cout<<left<<setw(15)<<studentas[i].pavarde;
	    cout<<left<<setw(15)<<studentas[i].vardas;
	    cout<<left<<setw(16)<<fixed<<setprecision(2)<<studentas[i].vidurkis;
	    cout<<fixed<<setprecision(2)<<studentas[i].mediana<<endl;
        }
}

}
void fileIsvedimas(vector<Studentas> &studentas){
ofstream pushf ("Rezultatai.txt");

	int Studkiekis=studentas.size();
cout<<"Norite galutini pazymi vidurkiu(v), mediana(m) ar abiem(bet koks simbolis)"<<endl;
string galutinis=Rtikrinimas();
if(galutinis=="v"){
	pushf<<left<<setw(15)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
pushf<<"------------------------------------------------------------------"<<endl;
for(int i=0; i<Studkiekis; i++){
	pushf<<left<<setw(15)<<studentas[i].pavarde;
	pushf<<left<<setw(15)<<studentas[i].vardas;
	pushf<<left<<setw(15)<<fixed<<setprecision(2)<<studentas[i].vidurkis<<endl;
}
}
else if(galutinis=="m"){
	pushf<<left<<setw(15)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(med.)"<<endl;
pushf<<"------------------------------------------------------------------"<<endl;
for(int i=0; i<Studkiekis; i++){
	pushf<<left<<setw(15)<<studentas[i].pavarde;
	pushf<<left<<setw(15)<<studentas[i].vardas;
	pushf<<left<<setw(15)<<fixed<<setprecision(2)<<studentas[i].mediana<<endl;
}
}
else
{
	pushf<<left<<setw(15)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(16)<<"Galutinis(vid.)"<<left<<setw(5)<<"Galutinis(med.)"<<endl;
    pushf<<"------------------------------------------------------------------"<<endl;
        for(int i=0; i<Studkiekis; i++){
	    pushf<<left<<setw(15)<<studentas[i].pavarde;
	    pushf<<left<<setw(15)<<studentas[i].vardas;
	    pushf<<left<<setw(16)<<fixed<<setprecision(2)<<studentas[i].vidurkis;
	    pushf<<fixed<<setprecision(2)<<studentas[i].mediana<<endl;
        }
}
pushf.close();
}


int main(){
	vector <Studentas> studentai;
	cout<<"Ar norite ivesti studentus ranka(r) ar is failo(f)?"<<endl;
	string x;
	string file;
	cin>>x;
	while(x!="r" && x!="f"){
		cout<<"Neteisinga ivestis! Prasome ivesti r arba f"<<endl;
		cin>>x;
	}
	if(x=="r"){
	while(true){
	Studentas studentas;
	Ivedimas(studentas);
	vidurkis(studentas);
	mediana(studentas);
	studentai.push_back(studentas);
	if(Rtikrinimas()!="t"){
		break;
	}
	}
	sorting(studentai);
	Isvedimas(studentai);
	}
	else{
		cout<<"Iveskite .txt failo pavadinima"<<endl;
		cin>>file;
		fileIvedimas(studentai, file);
		sorting(studentai);
		fileIsvedimas(studentai);
		//Isvedimas(A, i);
	}
	


	return 0;
}
