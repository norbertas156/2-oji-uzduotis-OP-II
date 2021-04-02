#include "My_lib.h"
#include "Funkcijos.h"


void Isvedimas(vector<Studentas> &studentas){
	int Studkiekis=studentas.size();
cout<<"Norite galutini pazymi vidurkiu(v), mediana(m) ar abiem(bet koks simbolis)"<<endl;
string galutinis=Rtikrinimas();
if(galutinis=="v"){
	cout<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
cout<<"-----------------------------------------------------"<<endl;
for(int i=0; i<Studkiekis; i++){
	cout<<left<<setw(20)<<studentas[i].pavarde;
	cout<<left<<setw(15)<<studentas[i].vardas;
	cout<<left<<setw(15)<<fixed<<setprecision(2)<<studentas[i].vidurkis<<endl;
}
}
else if(galutinis=="m"){
	cout<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(med.)"<<endl;
cout<<"-----------------------------------------------------"<<endl;
for(int i=0; i<Studkiekis; i++){
	cout<<left<<setw(20)<<studentas[i].pavarde;
	cout<<left<<setw(15)<<studentas[i].vardas;
	cout<<left<<setw(15)<<fixed<<setprecision(2)<<studentas[i].mediana<<endl;
}
}
else
{
	cout<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(16)<<"Galutinis(vid.)"<<left<<setw(5)<<"Galutinis(med.)"<<endl;
    cout<<"------------------------------------------------------------------"<<endl;
        for(int i=0; i<Studkiekis; i++){
	    cout<<left<<setw(20)<<studentas[i].pavarde;
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
	pushf<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
pushf<<"-----------------------------------------------------"<<endl;
for(int i=0; i<Studkiekis; i++){
	pushf<<left<<setw(20)<<studentas[i].pavarde;
	pushf<<left<<setw(15)<<studentas[i].vardas;
	pushf<<left<<setw(15)<<fixed<<setprecision(2)<<studentas[i].vidurkis<<endl;
}
}
else if(galutinis=="m"){
	pushf<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(med.)"<<endl;
pushf<<"------------------------------------------------------"<<endl;
for(int i=0; i<Studkiekis; i++){
	pushf<<left<<setw(20)<<studentas[i].pavarde;
	pushf<<left<<setw(15)<<studentas[i].vardas;
	pushf<<left<<setw(15)<<fixed<<setprecision(2)<<studentas[i].mediana<<endl;
}
}
else
{
	pushf<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(16)<<"Galutinis(vid.)"<<left<<setw(5)<<"Galutinis(med.)"<<endl;
    pushf<<"------------------------------------------------------------------"<<endl;
        for(int i=0; i<Studkiekis; i++){
	    pushf<<left<<setw(20)<<studentas[i].pavarde;
	    pushf<<left<<setw(15)<<studentas[i].vardas;
	    pushf<<left<<setw(16)<<fixed<<setprecision(2)<<studentas[i].vidurkis;
	    pushf<<fixed<<setprecision(2)<<studentas[i].mediana<<endl;
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
for(int i=0; i<kietekai.size(); i++){
	pushK<<left<<setw(20)<<kietekai[i].pavarde;
	pushK<<left<<setw(15)<<kietekai[i].vardas;
	pushK<<left<<setw(15)<<fixed<<setprecision(2)<<kietekai[i].vidurkis<<endl;
}
pushK.close();
std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout<<file << ".txt failo irasu ivedimas i kietekus: "<< diff.count() << " s\n";
auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
pushN<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
pushN<<"-----------------------------------------------------"<<endl;
for(int i=0; i<nelaimingieji.size(); i++){
	pushN<<left<<setw(20)<<nelaimingieji[i].pavarde;
	pushN<<left<<setw(15)<<nelaimingieji[i].vardas;
	pushN<<left<<setw(15)<<fixed<<setprecision(2)<<nelaimingieji[i].vidurkis<<endl;
}
pushN.close();
std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file << ".txt failo irasu ivedimas i nelaiminguosius: "<< diff2.count() << " s\n";
}


void ListIsvedimas (list<Studentas> &kietekai, list<Studentas> &nelaimingieji, string file){
	std::list<Studentas>::iterator it;
	ofstream pushK ("Kietekai.txt", std::ofstream::out | std::ofstream::trunc);
	ofstream pushN("Nelaimingieji.txt", std::ofstream::out | std::ofstream::trunc);
	auto start = std::chrono::high_resolution_clock::now(); auto st=start;
	pushK<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
pushK<<"-----------------------------------------------------"<<endl;
for(it=kietekai.begin(); it!=kietekai.end(); ++it){
	pushK<<left<<setw(20)<<it->pavarde;
	pushK<<left<<setw(15)<<it->vardas;
	pushK<<left<<setw(15)<<fixed<<setprecision(2)<<it->vidurkis<<endl;
}
pushK.close();
std::chrono::duration<double> diff = std::chrono::high_resolution_clock::now()-start; // Skirtumas (s)
  cout<<file << ".txt failo irasu ivedimas i kietekus: "<< diff.count() << " s\n";
auto start2 = std::chrono::high_resolution_clock::now(); auto st2=start2;
pushN<<left<<setw(20)<<"Pavarde"<<left<<setw(15)<<"Vardas"<<left<<setw(15)<<"Galutinis(vid.)"<<endl;
pushN<<"-----------------------------------------------------"<<endl;
for(it=nelaimingieji.begin(); it!=nelaimingieji.end(); ++it){
	pushN<<left<<setw(20)<<it->pavarde;
	pushN<<left<<setw(15)<<it->vardas;
	pushN<<left<<setw(15)<<fixed<<setprecision(2)<<it->vidurkis<<endl;
}
pushN.close();
std::chrono::duration<double> diff2 = std::chrono::high_resolution_clock::now()-start2; // Skirtumas (s)
  cout <<file << ".txt failo irasu ivedimas i nelaiminguosius: "<< diff2.count() << " s\n";
}




