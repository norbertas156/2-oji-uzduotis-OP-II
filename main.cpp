#include "Funkcijos/My_lib.h"
#include "Funkcijos/Main_h.h"
#include "Funkcijos/Funkcijos.h"

void pasirinkimai (){
cout<<"Iveskite 1 spartos analize atlikti naudojant vector konteineri"<<
"\nIveskite 2 spartos analize atlikti naudojant deque konteineri"<<
"\nIveskite 3 spartos analize atlikti naudojant list konteineri"<<endl;
}
void strategija (){
	cout<<"Iveskite 1 norint atlikti spartos analize naudojant 2 naujus konteinerius"<<
	"\nIveskite 2 norint atlikti spartos analize naudojant 1 nauja konteineri"<<endl;
}


int main(){
	string pasirinkimas;
	int spartosP;
	int strateg;
	cout<<"Ar norite atlikti spartos analize(b) ar norite ivesti ranka(r)?"<<endl;
	cin>>pasirinkimas;
	while(pasirinkimas!="b" && pasirinkimas!="r"){
		cin.clear();
		cout<<"Neteisinga ivestis. Iveskite b arba r!"<<endl;
		cin>>pasirinkimas;
	}
	if(pasirinkimas=="b"){
		strategija();
		cin>>strateg;
		while(strateg<1 || strateg>2){
			cin.clear();
			cin.ignore();
			cout<<"Bloga ivestis. Prasome "<<endl;
			strategija();
			cin>>strateg;
		}
		pasirinkimai();
		cin>>spartosP;
		while(spartosP<1 || spartosP>3){
			cin.clear();
			cin.ignore();
			cout<<"Bloga ivestis. Prasome "<<endl;
			pasirinkimai();
			cin>>spartosP;
		}	
	benchmark(spartosP, strateg);
	}
	else{
	vector <Studentas> studentai;
	vector<Studentas> nelaimingieji;
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
	sort(studentai.begin(), studentai.end(), compare);
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
			filtras(studentai, nelaimingieji, file);
			FiltroIsvedimas(studentai, nelaimingieji, file);
		}
		else{
			sort(studentai.begin(), studentai.end(), compare);
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
}
