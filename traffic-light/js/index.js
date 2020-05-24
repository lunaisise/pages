window.addEventListener('DOMContentLoaded', () => {
    const typeAspects = {
        'double': {
            'r': {
                2: 'r'
            },
            'g': {
                1: 'g'
            }
        },
        'triple': {
            'r': {
                3: 'r'
            },
            'y': {
                2: 'y'
            },
            'g': {
                1: 'g'
            }
        },
        'quadruple-a': {
            'r': {
                2: 'r'
            },
            'yy': {
                1: 'y',
                4: 'y'
            },
            'y': {
                4: 'y'
            },
            'g': {
                3: 'g'
            }
        },
        'quadruple-b': {
            'r': {
                2: 'r'
            },
            'y': {
                3: 'y'
            },
            'yg': {
                1: 'y',
                4: 'g'
            },
            'g': {
                4: 'g'
            }
        },
        'quintuple-a': {
            'r': {
                3: 'r'
            },
            'yy': {
                1: 'y',
                4: 'y'
            },
            'y': {
                4: 'y'
            },
            'yg': {
                2: 'y',
                5: 'g'
            },
            'ygf': {
                2: 'yf',
                5: 'gf'
            },
            'g': {
                5: 'g'
            }
        },
        'quintuple-b': {
            'r': {
                4: 'r'
            },
            'y': {
                3: 'y'
            },
            'g': {
                2: 'g'
            },
            'gg': {
                1: 'g',
                5: 'g'
            }
        },
        'sextuple': {
            'r': {
                3: 'r'
            },
            'y': {
                5: 'y'
            },
            'yg': {
                1: 'y',
                4: 'g'
            },
            'g': {
                4: 'g'
            },
            'gg': {
                2: 'g',
                6: 'g'
            }
        }
    };
    const limitations = {
        'r': '停止',
        'yy': '警戒 - 25km以下',
        'y': '注意 - 65km以下',
        'yg': '減速 - 95km以下',
        'ygf': '抑速 - 105km以下',
        'g': '進行 - 130km以下',
        'gg': '高速進行 - 160km以下'
    };

    function changeType() {
        const num = Number(document.querySelector('[name="type"]:checked').dataset.num);

        document.querySelectorAll('#outer > li').forEach(e => {
            const eNum = Number(e.dataset.num);
            if (num < eNum) {
                e.style.display = 'none';
            } else {
                e.style.display = 'list-item';
            }
        });
        const type = document.querySelector('[name="type"]:checked').getAttribute('id');
        const aspect = document.querySelector('[name="aspect"]:checked').getAttribute('id');
        if (typeAspects[type][aspect] === undefined) {
            document.querySelector('#g').checked = true;
        }
        document.querySelectorAll('[name="aspect"]').forEach(e => {
            e.disabled = true;
        });
        Object.keys(typeAspects[type]).forEach(typeAspect => {
            document.querySelector(`#${typeAspect}`).disabled = false;
        });
        changeAspect();
    }
    changeType();

    document.querySelectorAll('[name="type"]').forEach(e => {
        e.addEventListener('change', () => {
            changeType();
        });
    });

    function changeAspect() {
        document.querySelectorAll('#outer > li').forEach(e => {
            e.setAttribute('class', '');
        });
        const type = document.querySelector('[name="type"]:checked').getAttribute('id');
        const aspect = document.querySelector('[name="aspect"]:checked').getAttribute('id');
        Object.keys(typeAspects[type][aspect]).forEach(num => {
            const ryg = typeAspects[type][aspect][num];
            document.querySelector(`#outer > li[data-num="${num}"]`).classList.add(ryg);
        });
        document.querySelector('#limitation').textContent = limitations[aspect];
    }

    document.querySelectorAll('[name="aspect"]').forEach(e => {
        e.addEventListener('change', () => {
            changeAspect();
        });
    });
});