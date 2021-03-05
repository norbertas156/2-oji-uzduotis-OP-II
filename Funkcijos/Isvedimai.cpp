#include "My_lib.h"
#include "Funkcijos.h"


void Isvedimas(vector<Studentas> &studentas){
	int Studkiekis=studentas.size();
cout<<"Norite galutini pazymi vidurkiu(v), mediana(m) ar abiem(bet koks simbolis)"<<endl;
string galutinis=Rtikrinimas();
if(galutinis=="v"){
	cout<<left<<setw(15)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
cout<<"-----------------------------------------------------"<<endl;
for(int i=0; i<Studkiekis; i++){
	cout<<left<<setw(15)<<studentas[i].pavarde;
	cout<<left<<setw(15)<<studentas[i].vardas;
	cout<<left<<setw(15)<<fixed<<setprecision(2)<<studentas[i].vidurkis<<endl;
}
}
else if(galutinis=="m"){
	cout<<left<<setw(15)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(med.)"<<endl;
cout<<"-----------------------------------------------------"<<endl;
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
pushf<<"-----------------------------------------------------"<<endl;
for(int i=0; i<Studkiekis; i++){
	pushf<<left<<setw(15)<<studentas[i].pavarde;
	pushf<<left<<setw(15)<<studentas[i].vardas;
	pushf<<left<<setw(15)<<fixed<<setprecision(2)<<studentas[i].vidurkis<<endl;
}
}
else if(galutinis=="m"){
	pushf<<left<<setw(15)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(med.)"<<endl;
pushf<<"------------------------------------------------------"<<endl;
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