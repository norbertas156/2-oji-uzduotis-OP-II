#include "My_lib.h"
#include "Funkcijos.h"
#include "Studentas.h"

template <class X> 
void Isvedimas(X &studentas){
	vector<Studentas>::iterator it;
cout<<"Norite galutini pazymi vidurkiu(v), mediana(m) ar abiem(bet koks simbolis)"<<endl;
string galutinis=Rtikrinimas();
if(galutinis=="v"){
	cout<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
cout<<"-----------------------------------------------------"<<endl;
for(it=studentas.begin(); it!=studentas.end(); ++it){
	cout<<left<<setw(20)<<it->pavarde();
	cout<<left<<setw(15)<<it->vardas();
	cout<<left<<setw(15)<<fixed<<setprecision(2)<<it->galVidurkis()<<endl;
}
}
else if(galutinis=="m"){
	cout<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(med.)"<<endl;
cout<<"-----------------------------------------------------"<<endl;
for(it=studentas.begin(); it!=studentas.end(); ++it){
	cout<<left<<setw(20)<<it->pavarde();
	cout<<left<<setw(15)<<it->vardas();
	cout<<left<<setw(15)<<fixed<<setprecision(2)<<it->galMediana()<<endl;
}
}
else
{
	cout<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(16)<<"Galutinis(vid.)"<<left<<setw(5)<<"Galutinis(med.)"<<endl;
    cout<<"------------------------------------------------------------------"<<endl;
        for(it=studentas.begin(); it!=studentas.end(); ++it){
	    cout<<left<<setw(20)<<it->pavarde();
		cout<<left<<setw(15)<<it->vardas();
	    cout<<left<<setw(16)<<fixed<<setprecision(2)<<it->galVidurkis();
	    cout<<fixed<<setprecision(2)<<it->galMediana()<<endl;
        }
}

}

template <class X>
void fileIsvedimas(X &studentas){
ofstream pushf ("Rezultatai.txt");
vector<Studentas>::iterator it;

cout<<"Norite galutini pazymi vidurkiu(v), mediana(m) ar abiem(bet koks simbolis)"<<endl;
string galutinis=Rtikrinimas();
if(galutinis=="v"){
	pushf<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
pushf<<"-----------------------------------------------------"<<endl;
for(it=studentas.begin(); it!=studentas.end(); ++it){
	pushf<<left<<setw(20)<<it->pavarde();
	pushf<<left<<setw(15)<<it->vardas();
	pushf<<left<<setw(15)<<fixed<<setprecision(2)<<it->galVidurkis()<<endl;
}
}
else if(galutinis=="m"){
	pushf<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(med.)"<<endl;
pushf<<"------------------------------------------------------"<<endl;
for(it=studentas.begin(); it!=studentas.end(); ++it){
	pushf<<left<<setw(20)<<it->pavarde();
	pushf<<left<<setw(15)<<it->vardas();
	pushf<<left<<setw(15)<<fixed<<setprecision(2)<<it->galMediana()<<endl;
}
}
else
{
	pushf<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(16)<<"Galutinis(vid.)"<<left<<setw(5)<<"Galutinis(med.)"<<endl;
    pushf<<"------------------------------------------------------------------"<<endl;
        for(it=studentas.begin(); it!=studentas.end(); ++it){
		pushf<<left<<setw(20)<<it->pavarde();
		pushf<<left<<setw(15)<<it->vardas();
		pushf<<left<<setw(15)<<fixed<<setprecision(2)<<it->galVidurkis()<<endl;
	    pushf<<fixed<<setprecision(2)<<it->galMediana()<<endl;
        }
}
pushf.close();
}
template <class X>
void FiltroIsvedimas (X &kietekai, X &nelaimingieji, string file){
	ofstream pushK ("Kietekai.txt");
	ofstream pushN("Nelaimingieji.txt");
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
	pushK<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
pushK<<"-----------------------------------------------------"<<endl;
for(auto &kietekas : kietekai){
	pushK<<left<<setw(20)<<kietekas.pavarde();
	pushK<<left<<setw(15)<<kietekas.vardas();
	pushK<<left<<setw(15)<<fixed<<setprecision(2)<<kietekas.galVidurkis()<<endl;
}
pushK.close();
std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout<<file << ".txt failo irasu ivedimas i kietekus: "<< diff.count() << " s\n";
auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
pushN<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
pushN<<"-----------------------------------------------------"<<endl;
for(auto &nelaimingasis: nelaimingieji){
	pushN<<left<<setw(20)<<nelaimingasis.pavarde();
	pushN<<left<<setw(15)<<nelaimingasis.vardas();
	pushN<<left<<setw(15)<<fixed<<setprecision(2)<<nelaimingasis.galVidurkis()<<endl;
}
pushN.close();
std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file << ".txt failo irasu ivedimas i nelaiminguosius: "<< diff2.count() << " s\n";
}


void ListIsvedimas (list<Studentas> &kietekai, list<Studentas> &nelaimingieji, string file){
	list<Studentas>::iterator it;
	ofstream pushK ("Kietekai.txt", std::ofstream::out | std::ofstream::trunc);
	ofstream pushN("Nelaimingieji.txt", std::ofstream::out | std::ofstream::trunc);
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
	pushK<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
pushK<<"-----------------------------------------------------"<<endl;
for(it=kietekai.begin(); it!=kietekai.end(); ++it){
	pushK<<left<<setw(20)<<it->pavarde();
	pushK<<left<<setw(15)<<it->vardas();
	pushK<<left<<setw(15)<<fixed<<setprecision(2)<<it->galVidurkis()<<endl;
}
pushK.close();
std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout<<file << ".txt failo irasu ivedimas i kietekus: "<< diff.count() << " s\n";
auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
pushN<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
pushN<<"-----------------------------------------------------"<<endl;
for(it=nelaimingieji.begin(); it!=nelaimingieji.end(); ++it){
	pushN<<left<<setw(20)<<it->pavarde();
	pushN<<left<<setw(15)<<it->vardas();
	pushN<<left<<setw(15)<<fixed<<setprecision(2)<<it->galVidurkis()<<endl;
}
pushN.close();
std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file << ".txt failo irasu ivedimas i nelaiminguosius: "<< diff2.count() << " s\n";
}




