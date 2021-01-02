window.addEventListener('DOMContentLoaded', () => {
    let trainTypes = [];

    function showTrain(places) {
        Object.keys(places).forEach(placeNumber => {
            const trains = places[placeNumber];
            trains.forEach(train => {
                const bs = Number(train['bs']);
                const sy = Number(train['sy']);
                const hk = Number(train['hk']);
                const isUp = hk === 2;
                const isStop = bs !== 0;
                const upDpwn = isUp ? 'up' : 'down';
                const stopRun = isStop ? 'station-stop' : 'station-run';

                const trainType = trainTypes[sy];
                const trainName = trainType['abbreviation'].substr(-1);
                const trainColor = trainType['color'];

                const p = document.createElement('p');
                p.textContent = trainName;
                p.style.backgroundColor = `#${trainColor}`;
                p.dataset.stop = isStop;

                let elem = document.querySelector(`[data-id="${placeNumber}"] > .${upDpwn} > .${stopRun}`);
                const isUpSideDown = elem.closest('.up-side-down') !== null;
                const thisStation = elem.closest(`#KK${placeNumber}`);
                const prevStation = thisStation.previousElementSibling;
                const nextStation = thisStation.nextElementSibling;

                if (!isUpSideDown && !isUp && !isStop) {
                    if (prevStation === null) {
                        elem = thisStation.querySelector('.down > .station-stop');
                    } else {
                        elem = prevStation.querySelector('.down > .station-run');
                    }
                }

                if (isUpSideDown && isUp && !isStop) {
                    if (nextStation === null) {
                        elem = thisStation.querySelector('.up > .station-stop');
                    } else {
                        elem = nextStation.querySelector('.up > .station-run');
                    }
                }

                elem.appendChild(p);
            });
        });
    }

    function checkData(json) {
        // console.log(json);
        document.querySelector('#yy').textContent = json['UP'][0]['dt'][0]['yy'];
        document.querySelector('#mt').textContent = json['UP'][0]['dt'][0]['mt'];
        document.querySelector('#dy').textContent = json['UP'][0]['dt'][0]['dy'];
        document.querySelector('#hh').textContent = json['UP'][0]['dt'][0]['hh'];
        document.querySelector('#mm').textContent = json['UP'][0]['dt'][0]['mm'];
        document.querySelector('#ss').textContent = json['UP'][0]['dt'][0]['ss'];

        let Es = {};
        let EsIDs = [];
        let EsParams = [];
        let EDs = {};
        let EDsIDs = [];
        let EDsParams = [];
        let EUs = {};
        let EUsIDs = [];
        let EUsParams = [];
        let SDs = {};
        let SDsIDs = [];
        let SDsParams = [];
        let SUs = {};
        let SUsIDs = [];
        let SUsParams = [];
        json['KN'].forEach(KN => {
            const id = KN['id'];
            const tr = KN['tr'];
            // console.log(id);
            const eMatch = id.match(/^E(\d+)$/);
            if (eMatch) {
                const number = eMatch[1].substr(-2);
                EsIDs.push(number);
                EsParams[number] = tr;
            }
            const edMatch = id.match(/^ED0(\d+)$/);
            if (edMatch) {
                const number = edMatch[1];
                EDsIDs.push(number);
                EDsParams[number] = tr;
            }
            const euMatch = id.match(/^EU0(\d+)$/);
            if (euMatch) {
                const number = euMatch[1];
                EUsIDs.push(number);
                EUsParams[number] = tr;
            }
            const sdMatch = id.match(/^SD0(\d+)$/);
            if (sdMatch) {
                const number = sdMatch[1] + 'sub';
                SDsIDs.push(number);
                SDsParams[number] = tr;
            }
            const suMatch = id.match(/^SU0(\d+)$/);
            if (suMatch) {
                const number = suMatch[1] + 'sub';
                SUsIDs.push(number);
                SUsParams[number] = tr;
            }
            if (!eMatch && !edMatch && !euMatch && !sdMatch && !suMatch) {
                console.log(KN);
            }
        });
        EsIDs.forEach(number => {
            Es[number] = EsParams[number];
        });
        EDsIDs.forEach(number => {
            EDs[number] = EDsParams[number];
        });
        EUsIDs.forEach(number => {
            EUs[number] = EUsParams[number];
        });
        SDsIDs.forEach(number => {
            SDs[number] = SDsParams[number];
        });
        SUsIDs.forEach(number => {
            SUs[number] = SUsParams[number];
        });

        let Bs = {};
        let BsIDs = [];
        let BsParams = [];
        let Ds = {};
        let DsIDs = [];
        let DsParams = [];
        let Ss = {};
        let SsIDs = [];
        let SsParams = [];
        let Us = {};
        let UsIDs = [];
        let UsParams = [];
        json['EK'].forEach(EK => {
            const id = EK['id'];
            const tr = EK['tr'];
            // console.log(id);
            const bMatch = id.match(/^B0(\d+)$/);
            if (bMatch) {
                const number = bMatch[1].substr(-2);
                BsIDs.push(number);
                BsParams[number] = tr;
            }
            const dMatch = id.match(/^D0(\d+)$/);
            if (dMatch) {
                const number = dMatch[1];
                DsIDs.push(number);
                DsParams[number] = tr;
            }
            const sMatch = id.match(/^S0(\d+)$/);
            if (sMatch) {
                const number = sMatch[1] + 'sub';
                SsIDs.push(number);
                SsParams[number] = tr;
            }
            const uMatch = id.match(/^U0(\d+)$/);
            if (uMatch) {
                const number = uMatch[1];
                UsIDs.push(number);
                UsParams[number] = tr;
            }
            if (!bMatch && !dMatch && !sMatch && !uMatch) {
                console.log(EK);
            }
        });
        BsIDs.forEach(number => {
            Bs[number] = BsParams[number];
        });
        DsIDs.forEach(number => {
            Ds[number] = DsParams[number];
        });
        SsIDs.forEach(number => {
            Ss[number] = SsParams[number];
        });
        UsIDs.forEach(number => {
            Us[number] = UsParams[number];
        });

        // console.log(json);
        // console.log(Es);
        // console.log(EDs);
        // console.log(EUs);
        // console.log(SDs);
        // console.log(SUs);
        // console.log(Bs);
        // console.log(Ds);
        // console.log(Ss);
        // console.log(Us);
        document.querySelectorAll('.station-stop').forEach(elem => {
            elem.textContent = null
        });
        document.querySelectorAll('.station-run').forEach(elem => {
            elem.textContent = null
        });
        showTrain(Es);
        showTrain(EDs);
        showTrain(EUs);
        showTrain(SDs);
        showTrain(SUs);
        showTrain(Bs);
        showTrain(Ds);
        showTrain(Ss);
        showTrain(Us);
    }

    function getZaisen() {
        fetch('https://tid.keikyu.co.jp/data/local/zaisen.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response.status;
            }).then(json => {
                // console.log(json);
                checkData(json);
            }).catch(error => {
                console.error(error);
            });
    }

    function showStations(stations, parentId) {
        Object.keys(stations).forEach(id => {
            const station = stations[id];
            const stationNumber = id.substr(2);
            const stationName = station['name'];
            const types = station['type'];

            const template = document.querySelector('#station-template');
            const clone = template.content.cloneNode(true);
            clone.querySelector('li[id]').id = id;
            clone.querySelector('.station-number').textContent = stationNumber.substr(0, 2);
            clone.querySelector('.station-name').textContent = stationName;
            clone.querySelector('.train').dataset.id = stationNumber;
            types.sort((a, b) => {
                return a < b ? 1: -1;
            });
            types.forEach(typeId => {
                const type = trainTypes[typeId];
                const abbreviation = type['abbreviation'];
                const color = type['color'];
                const li = document.createElement('li');
                li.dataset.id = typeId;
                li.style.backgroundColor = `#${color}`;
                li.textContent = abbreviation.substr(-1);
                clone.querySelector('.train-types').appendChild(li);
            });
            document.querySelector(`#${parentId} > .stations`).appendChild(clone.querySelector('li[id]'));
        });
    }

    function setSubStation(line, lineName, isUp = false) {
        const name = line['name'];
        const joiningStation = line['joining_station'];
        const connectionStation = line['connection_station'];
        const mainStation = joiningStation !== undefined ? joiningStation : connectionStation !== undefined ? connectionStation : '';

        const template = document.querySelector('#sub-template');
        const clone = template.content.cloneNode(true);
        const parentId = `${lineName}sub`;
        clone.querySelector('div[id]').id = parentId;
        clone.querySelector('h2').textContent = name;
        if (isUp) {
            clone.querySelector('.stations').classList.add('up-side-down');
        }
        document.querySelector('#sub').appendChild(clone.querySelector('div[id]'));

        showStations(line['stations'], parentId);
        // document.querySelector(`#${parentId} #${mainStation}`).id = `${mainStation}sub`;

        const headerHight = document.querySelector('header').clientHeight
        let top = document.querySelector(`#${mainStation}`).getBoundingClientRect().top;
        let h2Height = document.querySelector(`#${parentId} > h2`).clientHeight;
        let elementTop = top - headerHight - h2Height;
        if (isUp) {
            top = document.querySelector(`#${mainStation}`).nextElementSibling.getBoundingClientRect().top;
            const height = document.querySelector(`#${parentId}`).clientHeight;
            elementTop = top - headerHight - height;
        }
        document.querySelector(`#${parentId}`).style.top = `${elementTop}px`;
    }

    function setStation(json) {
        // console.log(json['lines']);
        trainTypes = json['train_types'];
        // console.log(trainTypes);
        showStations(json['lines']['main']['stations'], 'main');
        setSubStation(json['lines']['airport'], 'airport', true);
        setSubStation(json['lines']['daishi'], 'daishi');
        setSubStation(json['lines']['zushi'], 'zushi');
        setSubStation(json['lines']['kurihama'], 'kurihama');
        getZaisen();
        const interval = setInterval(() => {
            getZaisen();
        }, 20 * 1000);
    }

    fetch('./meta.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response.status;
        }).then(json => {
            // console.log(json);
            setStation(json);
        }).catch(error => {
            console.error(error);
        });
});