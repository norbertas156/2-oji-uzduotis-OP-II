#include "Funkcijos/My_lib.h"
#include "Funkcijos/Main_h.h"
#include "Funkcijos/Funkcijos.h"


int main(){
	vector <Studentas> studentai;
	vector<Studentas> kietekai;
	vector<Studentas> nelaimingieji;
	string pasirinkimas;
	cout<<"Ar norite failus generuoti failus(t-taip)?"<<endl;
	string a;
	int studSk;
	cin>>a;
	while(a=="t"){
		cin.clear();
		cout<<"Kiek studentu norite?"<<endl;
		studSk=StudentuSK();
		RandomIvedimas(studSk);
		cout<<"Ar norite sugeneruoti dar viena faila(t-taip)?"<<endl;
		cin>>a;
	}

	cout<<"Ar norite ivesti studentus ranka(r) ar is failo(f)?"<<endl;
	string x;
	string file;
	cin>>x;
	while(x!="r" && x!="f"){
		cin.clear();
		cout<<"Neteisinga ivestis! Prasome ivesti r arba f"<<endl;
		cin>>x;
	}
	try{
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
		cout<<"Ar norite filtruoti ar rusiuoti?(f-filtruoti, r-rusiuoti)"<<endl;
		cin>>pasirinkimas;
		while (pasirinkimas!="f" && pasirinkimas!="r"){
			cin.clear();
			cout<<"Prasome ivesti f(filtravimui) arba r(rusiuoti)!"<<endl;
			cin>>pasirinkimas;
		}
		if(pasirinkimas == "f"){
			filtras(studentai,kietekai, nelaimingieji, file);
			//sorting(kietekai);
			//sorting(nelaimingieji);
			FiltroIsvedimas(kietekai, nelaimingieji, file);
		}
		else{
			sorting(studentai);
			fileIsvedimas(studentai);
		}
		
		
		//Isvedimas(A, i);
	}
	return 0;
	}
	catch(std::exception& e){
			std::cerr<<e.what()<<endl;
		}
	
	
}
