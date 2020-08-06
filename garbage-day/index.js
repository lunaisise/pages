window.addEventListener('DOMContentLoaded', () => {
    const garbageTypes = {
        burnable: '可燃ごみ',
        unburnable: '不燃ごみ',
        recyclable: '資源ごみ'
    };
    const garbageSchedule = [
        {
            cycle: 0,
            type: 'burnable',
            day: 3
        },
        {
            cycle: 0,
            type: 'burnable',
            day: 6
        },
        {
            cycle: 0,
            type: 'recyclable',
            day: 2
        },
        {
            cycle: 1,
            type: 'unburnable',
            day: 1
        },
        {
            cycle: 3,
            type: 'unburnable',
            day: 1
        }
    ];

    let ymd = '';

    function isMatchCycle(date, cycle) {
        if (1 <= date && date <= 7 && cycle === 1) {
            return true;
        } else if (8 <= date && date <= 14 && cycle === 2) {
            return true;
        } else if (15 <= date && date <= 21 && cycle === 3) {
            return true;
        } else if (22 <= date && date <= 28 && cycle === 4) {
            return true;
        } else if (29 <= date && cycle === 5) {
            return true;
        }
        return false;
    }

    function getDayJa(day) {
        if (day === 0) {
            return '日';
        }
        if (day === 1) {
            return '月';
        }
        if (day === 2) {
            return '火';
        }
        if (day === 3) {
            return '水';
        }
        if (day === 4) {
            return '木';
        }
        if (day === 5) {
            return '金';
        }
        if (day === 6) {
            return '土';
        }
        return '';
    }

    function createSchedule() {
        const today = new Date;
        ymd = '' + today.getFullYear() + today.getMonth() + today.getDate();
        document.querySelector('main').textContent = '';
        for (let i = 0; i < 30; i++) {
            const targetDate = new Date;
            targetDate.setDate(targetDate.getDate() + i);

            const month = targetDate.getMonth() + 1;
            const date = targetDate.getDate();
            const day = targetDate.getDay();

            let type = '';
            for (let key = 0; key < garbageSchedule.length; key++) {
                const schedule = garbageSchedule[key];
                const sCycle = schedule['cycle'];
                const sType = schedule['type'];
                if (day !== schedule['day']) {
                    continue;
                }
                if (sCycle === 0) {
                    type = sType;
                    break;
                }
                if (isMatchCycle(date, sCycle)) {
                    type = sType;
                    break;
                }
            }
            if (type.length === 0) {
                continue;
            }
            const typeJa = garbageTypes[type];

            let nearDay = '';
            switch (i) {
                case 0:
                    nearDay = '今日 - ';
                    break;
                case 1:
                    nearDay = '明日 - ';
                    break;
                case 2:
                    nearDay = '明後日 - ';
                    break;
            }
            const dayJa = getDayJa(day);
            const dateStr = `${nearDay}${month}/${date} (${dayJa})`;

            const template = document.querySelector('#garbage-temp');
            const clone = document.importNode(template, true);
            const section = clone.querySelector('section');
            section.classList.add(type);
            section.querySelector('h2').textContent = typeJa;
            section.querySelector('.date').textContent = dateStr;
            document.querySelector('main').appendChild(section);
        }
    }
    createSchedule();

    setInterval(() => {
        const today = new Date;
        const thisymd = '' + today.getFullYear() + today.getMonth() + today.getDate();
        if (thisymd !== ymd) {
            createSchedule();
        }
    }, 60 * 1000);
});