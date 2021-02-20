#include "My_lib.h"

struct Studentas{
string vardas;
string pavarde;
int pazymiusk;
int pazymiai[50];
double vidurkis;
int egzaminas;
double mediana;
};

void vidurkis(Studentas A[], int n){
	double temp=0;
for(int i=0; i<A[n].pazymiusk; i++){
temp+=A[n].pazymiai[i];
}
A[n].vidurkis=(temp/A[n].pazymiusk*0.4)+(A[n].egzaminas*0.6);
}

void mediana(Studentas A[], int n){
	double temp=0;
	sort(A[n].pazymiai, A[n].pazymiai+A[n].pazymiusk);
if(A[n].pazymiusk%2==0){
	temp=(A[n].pazymiai[(A[n].pazymiusk+1)/2]+A[n].pazymiai[(A[n].pazymiusk-1)/2])*0.4/2.0+(A[n].egzaminas*0.6);
}
else{
	temp=(A[n].pazymiai[A[n].pazymiusk/2]*0.4)+(A[n].egzaminas*0.6);
}
A[n].mediana=temp;
}
char Rtikrinimas (){
char n;
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
	cin.clear();
	cin.ignore();
	cout<<"Bloga Ivestis. Prasome ivesti skaciu!"<<endl;
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
	cout<<"Bloga Ivestis. Prasome ivesti skaciu!"<<endl;
	cin>>n;
}
return n;
}

void Ivedimas(Studentas A[], int & i){
	unsigned seed =std::chrono::system_clock::now().time_since_epoch().count();
	std::mt19937 generator(seed);
	std::uniform_int_distribution<int> distribution(1, 10);
	cout<<"Iveskite varda"<<endl;
	cin>>A[i].vardas;
	cout<<"Iveskite pavarde"<<endl;
	cin>>A[i].pavarde;
	cout<<"Ar zinote namu darbu skaiciu? (t-taip, bet kokia kita raide-ne)"<<endl;
	char ndskz=Rtikrinimas();
	if(ndskz=='t'){
		cout<<"Iveskite pazymiu skaiciu"<<endl;
			cin>>A[i].pazymiusk;
			while (A[i].pazymiusk<1){
			cin.clear();
			cin.ignore();
			cout<<"Blogas Ivestis. Prasome ivesti skaciu didesni uz 1!"<<endl;
			cin>>A[i].pazymiusk;
			}
			cout<<"Ar norite namu darbus ivesti ranka? (t-taip, bet kokia kita raide-ne)"<<endl;
			char ndskr =Rtikrinimas();
			if(ndskr=='t'){
				cout<<"Iveskite pazymius"<<endl;
				for(int j=0; j<A[i].pazymiusk; j++){
					A[i].pazymiai[j]=Sktikrinimas();
				}
				cout<<"Iveskite egzamino rezultata"<<endl;
				A[i].egzaminas=Sktikrinimas();	
				}
			else{
				cout<<"Atsitiktinai sugeneruoti namu darbai: ";
				for(int j=0; j<A[i].pazymiusk; j++){
					A[i].pazymiai[j]=distribution(generator);
					cout<<A[i].pazymiai[j]<<" ";
					}
				A[i].egzaminas=distribution(generator);
				cout<<"Atsitiktinai sugeneruotas egzamino rezultatas: "<<A[i].egzaminas<<endl;
				}
			}

	else{
		 A[i].pazymiusk=0;
		cout<<"Noredami nutraukti ivedima iveskite 0!"<<endl;
		cout<<A[i].pazymiusk+1<<"-asis namu darbas"<<endl;
		A[i].pazymiai[A[i].pazymiusk]=Sktikrinimas();
		while(A[i].pazymiai[A[i].pazymiusk]!=0){
			A[i].pazymiusk++;
			cout<<A[i].pazymiusk+1<<"-asis namu darbas"<<endl;
			A[i].pazymiai[A[i].pazymiusk]=Paztikrinimas();
				}
				A[i].pazymiusk--;
				cout<<"Iveskite egzamino rezultata"<<endl;
				A[i].egzaminas=Sktikrinimas();	
							
	}
	
	vidurkis(A, i);
	mediana(A, i);
	i++;
	cout<<"Ar norite ivesti dar viena studenta?"<<endl;
	char stud=Rtikrinimas();
	if(stud=='t'){
		Ivedimas(A, i);
	}
}



void Isvedimas(Studentas A[], int n){
cout<<"Norite galutini pazymi vidurkiu(v), mediana(m) ar abiem(a)"<<endl;
char galutinis;
galutinis=Rtikrinimas();
if(galutinis=='v'){
	cout<<left<<setw(10)<<"Pavarde"<<left<<setw(10)<<"Vardas"<<left<<setw(20)<<"Galutinis(vid.)"<<endl;
cout<<"------------------------------------------"<<endl;
for(int i=0; i<n; i++){
	cout<<left<<setw(10)<<A[i].pavarde;
	cout<<left<<setw(10)<<A[i].vardas;
	cout<<left<<setw(20)<<fixed<<setprecision(2)<<A[i].vidurkis<<endl;
}
}
else if(galutinis=='m'){
	cout<<left<<setw(10)<<"Pavarde"<<left<<setw(10)<<"Vardas"<<left<<setw(20)<<"Galutinis(med.)"<<endl;
cout<<"------------------------------------------"<<endl;
for(int i=0; i<n; i++){
	cout<<left<<setw(10)<<A[i].pavarde;
	cout<<left<<setw(10)<<A[i].vardas;
	cout<<left<<setw(20)<<fixed<<setprecision(2)<<A[i].mediana<<endl;
}
}
else if(galutinis=='a'){
	cout<<left<<setw(10)<<"Pavarde"<<left<<setw(10)<<"Vardas"<<left<<setw(20)<<"Galutinis(vid.)"<<left<<setw(5)<<"Galutinis(med.)"<<endl;
cout<<"------------------------------------------------------------------"<<endl;
for(int i=0; i<n; i++){
	cout<<left<<setw(10)<<A[i].pavarde;
	cout<<left<<setw(10)<<A[i].vardas;
	cout<<left<<setw(20)<<fixed<<setprecision(2)<<A[i].vidurkis;
	cout<<fixed<<setprecision(2)<<A[i].mediana<<endl;
}
}
else{
	cout<<"Neteisingas ivedimas prasome pakartoti!"<<endl;
	Isvedimas(A, n);
}

}

int main(){
	Studentas A[10];
	int i=0;
	Ivedimas(A, i);
	Isvedimas(A, i);


	return 0;
}
