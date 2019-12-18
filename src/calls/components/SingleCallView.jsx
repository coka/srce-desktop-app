import React from 'react';
import { FaSave, FaPencilAlt, FaCopy, FaFileCsv } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';
import { ExportToCsv } from 'export-to-csv';

class SingleCallView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            call:{}
        }
    }

    render(){
        return(
            <div className="m-3 mr-0">
            <form >
                <div className="row border-top border-green">
                <div className="col-6 pt-4 ">
                    <h4>Poziv</h4>
                    <div className="form-row m-3 mr-0">
                        <div class="form-group col-md-4">
                            <label for="numberOfCall">Redni broj</label>
                            <input type="text" class="form-control" id="numberOfCall" />
                        </div>
                        <div class="form-group col-md-2 ml-3">
                            <label for="typeOfContact">Vrsta kontakta</label>
                            <select id="typeOfContact" class="form-control">
                                <option selected>Telefon</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="form-group col-md-2 ">
                            <label for="typeOfCall">Vrsta poziva</label>
                            <select id="typeOfCall" class="form-control">
                                <option selected>Cuteci</option>
                                <option>Informativni</option>
                                <option>Hronicni</option>
                                <option>Podrska</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row m-3 mr-0">
                        <div class="form-group col-md-4">
                            <label for="date">Datum</label>
                            <input type="date" class="form-control" id="date" />
                        </div>
                        <div class="form-group col-md-4 ml-3">
                            <label for="time">Vreme</label>
                            <input type="time" class="form-control" id="time" />
                        </div>
                        
                    </div>
                    <div className="form-row m-3 mr-0">
                        <div class="form-group col-md-2 ">
                            <label for="day">Dan</label>
                            <input type="text" class="form-control" id="day" />
                        </div>
                        <div class="form-group col-md-2 ">
                            <label for="duration">Trajanje</label>
                            <input type="text" class="form-control" id="duration" />
                        </div>
                    </div>
                </div>

                <div className="col-5 mt-4 ml-4">
                    <h4>Pozivar</h4>
                    <div className="form-row m-3 mr-0">
                        <div class="form-group col-md-4">
                            <label for="name">Ime ili nadimak</label>
                            <input type="text" class="form-control" id="name" />
                        </div>
                        <div class="form-group col-md-3 ml-3">
                            <label for="gender">Pol</label>
                            <select id="gender" class="form-control">
                                <option selected>Muški</option>
                                <option>Ženski</option>
                            </select>
                        </div>
                        <div class="form-group col-md-3 ml-3">
                            <label for="age">Starost</label>
                            <select id="age" class="form-control">
                                <option selected>...</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row m-3 mr-0">
                        <div class="form-group col-md-4 ">
                            <label for="maritalStatus">Bračno stanje</label>
                            <select id="maritalStatus" class="form-control">
                                <option selected>Udata/oženjen</option>
                                <option>Razveden/a</option>
                                <option>Udovac/udovica</option>
                                <option>Samac ima partnera</option>
                                <option>Samac nema partnera</option>
                                <option>Neutvrđeno</option>
                            </select>
                        </div>
                        <div class="form-group col-md-3 ml-3">
                            <label for="numberOfTimesCalled">Koji put zove</label>
                            <select id="numberOfTimesCalled" class="form-control">
                                <option selected>Prvi put</option>
                                <option>2 i vise</option>
                            </select>
                        </div>
                        <div class="form-group col-md-3 ml-3">
                            <label for="plan">Ukljucenost u plan</label>
                            <select id="plan" class="form-control">
                                <option selected>...</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row  m-3 mr-0">
                    <div class="form-group col-md-6">
                            <label for="volunteer">Volonter</label>
                            <select id="volunteer" class="form-control">
                                <option selected>iz baze</option>
                            </select>
                        </div>
                    </div>
                </div>
                </div>

                <div className="row border-top border-bottom border-green">
                <div className="col-md-12 mt-4">
                    <h4>Opis razgovora</h4>
                    <div className="row mr-0">
                        <div className="col-md-3 m-3">
                            <div className="form-group ">
                                <label for="problem">Vrsta problema</label>
                                <select id="problem" class="form-control">
                                    <option selected>Gubitak</option>
                                    <option>Usamljenost</option>
                                    <option>Partnerski</option>
                                    <option>Porodicni</option>
                                    <option>Problem na radnom mestu, skoli ili fakultetu</option>
                                    <option>Egzistencijalni problem (nezaposlenost, siromastvo, nemanje perspektive, opste nezadovoljstvo zivotom)</option>
                                    <option>Bolest zavisnosti: alkoholizam</option>
                                    <option>Bolest zavisnosti: narkomanija</option>
                                    <option>Mentalni (psihicki) poremecaj</option>
                                    <option>Pronlem seksualne prirode (seks. disfunkcija, masturbacija, frigidnost, nimfomanija, promiskuitet, velicina polnog organa, fetisizam, incest, voajerizam, strah od odnosa...)</option>
                                    <option>Problem usled seks. orijentacije (homoseksualnost, biseksualnost, transseksualnost, transvestit)</option>
                                    <option>Telesna bolest</option>
                                    <option>Invaliditet</option>
                                    <option>Zlostavljanje (svi vidovi)</option>
                                    <option>Poziv za trecu osobu</option>
                                    <option>Manipulativni</option>
                                    <option>DRUGO (obavezno napisati u napomeni vrstu problema)</option>
                                </select>
                            </div>
                                <div class="form-group ">
                                    <label for="suicidalRisk">Suicidalni rizik</label>
                                    <select id="suicidalRisk" class="form-control">
                                        <option selected>Nije utvrdjen</option>
                                        <option>Nema suicidalne misli</option>
                                        <option>Ima suicidalne misli, nema plan</option>
                                        <option>Ima plan samoubistva i ozbiljno razmišlja o tome</option>
                                        <option>Postoji neposredan rizik da će osoba izvršiti samoubistvo</option>
                                    </select>
                                </div>
                                <div class="form-group ">
                                    <label for="suicidalFactor">Suicidalni fatkor</label>
                                    <select id="suicidalFactor" class="form-control">
                                        <option selected>Mentalni (psihički) poremećaj</option>
                                        <option>Bolest zavisnosti</option>
                                        <option>Psihička kriza</option>
                                        <option>Fizičko oboljenje</option>
                                        <option>Trauma ili zlostavljanje</option>
                                        <option>Raniji pokušaj suicida</option>
                                        <option>Suicid člana porodice</option>
                                    </select>
                                </div>
                                <div class="form-group ">
                                    <label for="numberOfTries">Pokusaji</label>
                                    <select id="numberOfTries" class="form-control">
                                        <option selected>...</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-8 m-3">
                                <div class="form-group">
                                    <label for="content">Kratak sadrzaj</label>
                                    <textarea class="form-control" id="content" rows="6"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">Napomena</label>
                                    <textarea class="form-control" id="content" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>  

            <div className="row m-3 mr-0">
                <div className="col-12 text-center" >
                    <button
                        className="btn border-green btn-dark-green"
                        onClick={this.handleSaveData}
                    >
                        <FaSave />
                        &nbsp;Snimi
                    </button>
                    <button
                        className="btn border-green ml-2 btn-dark-green"
                        onClick={this.handleUpdateData}
                    >
                        <FaPencilAlt />
                        &nbsp;Izmeni
                    </button>
                    <button
                        className="btn border-green  ml-2 btn-dark-green"
                        onClick={this.handleCopyData}
                    >
                        <FaCopy />
                        &nbsp;Kopiraj
                    </button>
                    <button
                        className="btn border-green ml-2 btn-dark-green"
                        onClick={this.handleExportToExcel}
                    >
                        <FaFileCsv />
                        &nbsp;Prebaci u CSV
                    </button>
                    <button 
                        className="btn border-green ml-2 btn-dark-green"
                        onClick={this.handleExit}
                    >
                        <IoIosExit />
                        &nbsp;Izadji
                    </button>

                </div>
            </div>
            </div> 
        )
    }
}

export default SingleCallView;
