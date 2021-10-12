<script type="text/javascript" src="{$smarty.const.URL_ROOT}js/jquery-1.11.1.min.js"></script>
<script src='{$smarty.const.URL_ROOT}lib/pdfmake/build/pdfmake.min.js'></script>
<script src='{$smarty.const.URL_ROOT}lib/pdfmake/build/vfs_fonts.js'></script>
<!--script src='{$smarty.const.URL_ROOT}js/FileSaver/FileSaver.min.js'></script-->
<script src='{$smarty.const.URL_ROOT}_gestione/js/lib.js{$mobileV_js}'></script>
<script src='/_gestione/js/lib.js'></script>
<script>
    //Definizioni di variabili necessarie

    var invoice = new Fattura();
    var ins = new Inquilino_Stanza();
    var inquilino = new Inquilino();
    var cliente = new Cliente();
    var appartamento = new Appartamento();
    var stanza = new Appartamenti_Stanze();
    var fdi = new FatturaDettagliInquilino();
    var fcd = new ComponenteDettagli();
    var fdc = new FatturaDettagliCliente();
    var fattura_storno = new Fattura_Storno();
    var fatturaStornata = new Fattura();

    var colorText = '#5e5e5e';

    //margin: [left, top, right, bottom]

    var ivaFCD = [9];
    var ivaFDI = [];

    invoice = $.extend(new Fattura(), {$invoice});
    var actionPDF = {$actionPDF};

    if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
        ins = $.extend(new Inquilino_Stanza(), {$ins});
        inquilino = $.extend(new Inquilino(), {$inquilino});
        appartamento = $.extend(new Appartamento(), {$appartamento});
        stanza = $.extend(new Appartamenti_Stanze(), {$stanza});
        fdi = {$fdi};
        fcd = {$fcd};

        if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_STORNO}){
            fattura_storno = $.extend(new Fattura_Storno(), {$fattura_storno});
            fatturaStornata = $.extend(new Fattura(), {$fatturaStornata});
        }

    }else if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_CLIENTI}){
        cliente = $.extend(new Cliente(), {$cliente});
        fdc = {$fdc};

        if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_STORNO}){
            fattura_storno = $.extend(new Fattura_Storno(), {$fattura_storno});
            fatturaStornata = $.extend(new Fattura(), {$fatturaStornata});
        }

    }
    $(document).ready(function () {
        console.log(invoice);

        if(invoice.Data !== null && invoice.Data !== ''){
            invoice.Data = new Date(invoice.Data);
        }else{
            invoice.Data = '';
        }

        if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_STORNO} && fatturaStornata.Data !== null && fatturaStornata.Data !== ''){
            fatturaStornata.Data = new Date(fatturaStornata.Data);
        }else{
            fatturaStornata.Data = '';
        }

        var title = '';

        title = getNomeFile(title);

        var pdf_invoice = {
            background: [
                {
                    image: getBackgroundImage(invoice),
                    width: 592
                }
            ],
            header: {
                margin: [20, 20],
                columns: [
                    {
                        // usually you would use a dataUri instead of the name for client-side printing
                        // sampleImage.jpg however works inside playground so you can play with it
                        image: getLogo(invoice),
                        width: 220,
                        height: 60
                    }
                ]
            },
            footer: {
                //margin:  [20, 60],
                //height: 60,
                columns: [
                  getFooter(invoice),
                ]
            },
            content: [
                {
                    table : infoDestinatario(invoice),
                    layout: 'noBorders',
                    style: 'contenuto',
                },
                //{ text: 'Fattura n.' + invoice.Numero + '/' + invoice.Data.getFullYear().toString().substr(2,2), color: colorText, margin: [0, 30, 0, 10], style: 'contenuto', },
                getTitoloTipologia(invoice),
                contenuto(invoice),

            ],
            styles : {
                textFooter : {
                    color: getTextColor(invoice),
                    bold: true,
                },
                contenuto : {
                    fontSize: 9,
                    //pageBreak: 'before',
                }
            },
            pageSize: 'A4',
            pageMargins: [40, 90, 40, 40],
            info: {
                title: title,
                author: 'Finlibera SPA',
            },
            //pageMargins: [40, 90],
        };

        if(parseInt(actionPDF) === 0){
            // download the PDF
            pdfMake.createPdf(pdf_invoice).download(title);
        }else if(parseInt(actionPDF) === 1){
            // open the PDF in a new window
            pdfMake.createPdf(pdf_invoice).open();
        }else if(parseInt(actionPDF) === 2){
            // print the PDF
            pdfMake.createPdf(pdf_invoice).print();
        }else if(parseInt(actionPDF) === 3){

        }

    });

    function getLogo(invoice){
        if(parseInt(invoice.Societa) === {$smarty.const.FINLIBERA}){
            return "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMdaHR0cDovL25zLmFkb2JlLmNvbS"
            + "94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1"
            + "ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAyMSA3OS4xNTU3NzIsIDIwMTQvMDEvMTMtMTk6NDQ6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJ"
            + "kZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRw"
            + "Oi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6e"
            + "G1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZCMUQ1NENBMjI3NjExRTY4MEIxQzFCMjU4NjdDQzFGIiB4bX"
            + "BNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZCMUQ1NEM5MjI3NjExRTY4MEIxQzFCMjU4NjdDQzFGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0"
            + "IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0iMTdCRTg3MkNFMDlEQzc0OTdEMjUzNDc4M0I4RUQ4OTAiIHN0UmVmOmRvY3VtZW50SUQ"
            + "9IjE3QkU4NzJDRTA5REM3NDk3RDI1MzQ3ODNCOEVEODkwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj"
            + "8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECA"
            + "gIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgATgDzAwERAAIRAQMRAf/EAMwAAQACAgMBAQEAAAAAAAAAAAAICgcJ"
            + "BQYLBAECAQEAAgIDAQEAAAAAAAAAAAAABQYHCAIDBAkBEAAABgIBAgMEBAgJDAMAAAABAgMEBQYABwgRCRITFCEVFgoxItYXQVEjWJgZWRoyk9Mk1FaX1xhxgZGhUjM0hFW"
            + "VlirV2JkRAAEDAwIDAwULBwoEBwAAAAEAAgMRBAUSBiETBzFBIlFhcRQVkdEyUtIjk1UWFwiBQpJT05TUseFicjMkVFZXGIJDpJXwwbJjoyWl/9oADAMBAAIRAxEAPwC/xh"
            + "EwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRYHunKfjFreVdwexORuh6FNsFPKfQ9029r6rSrJUCgcU3cfOWFi7bKeAwD0OQB"
            + "6D1ywWe0t1ZGBt1j8ZkJ7ZwqHx28z2keZzWEH8hUBdbq2vZXDrO8yVhDdtNCx9xCx4Pna54I/KFyevORnHvbsieI1RvbTWzpZJuo7Ui9ebPpF0kU2qQlKq5Oyrc5JOSN0xM"
            + "AGOJfCAiHUc82Q2/n8THzcpY3ltFWlZYZIxXyVe0Cq9llm8Nkn8vHXdrPJStI5WPNPLRriVmXIhSaYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRM"
            + "IsA8muTOpOI+n7JuzdE+MLU6+CbVoxZJpO7HbbG9IsaHp1PiFHDUZmzTR25/JR8xNFFFNVy5VQaIOF0rDtXa2a3nnIdv4CIy5CY+hrGj4UkjuOljRxc70AAuIBgN0bnwuzsH"
            + "PuHcEzYMZbtq5x7SfzWMH5z3Hg1o7T5qlUJu4P3keYnMaRmYCDtczoTRzoi7aP1TrmafRjuViHJhOmOwri0TjZy4vHTUyfmofzaJDwgZJmUwnOf6A7C6G7S2Vasu5WR5HPDi"
            + "64kaHBjhwIhjNWx6TXjxkrUF3cNBd69ddz70v5LJhkx+B7G27SWuew8QZnihk1NIOn+zpQhvedBNmj3Llw4cu1VnThY5lFXDhRRddVQwiJjqKqGMc5xH6REREcyDe2ta8Fw2"
            + "zmxAWsbQM8yxMuaYgH6UtASknByrRQFWslDvnUZINlCj1Ko3eMlUXCKhRDr1KYBDplXuYKVa4VYe0HsPp8q2CwOVt7yNsdw1kjfI4Bw9NDXirEHbB+Zb5NcUrRX9Xc0Jyzcle"
            + "Obp0yjFrVNr+9t26xZncHTUl4ezvVSu79EM0FuqkXLrKLeWgmRq6bB4iqYL3z0cwueiffbfZHZZkAmjRphlPkcwcGE/HYBxJLmuPEZow1/KyMCJ7pIPiOcXOH9R7iT/AMLiR2"
            + "BpYBQ+iTq3aOvd2a7pu2tUW2GveuNgwDCz062wDn1MVNwskkCrZ0gYxU10FiD1TXbrETcNVyHRWTTVIchdQr6xu8bdyWF/G6K8ieWvY7tBH/ioIqCKEEggq4Me2Rgew1aRwXf"
            + "c8q5JhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCKgv3wudEnyL5s2vTsLKq/dJxclJTWEFFE8SLaT2WzOm12xanyBgAyr9vY2x4FuJhMkRnEAqiBBdr+"
            + "P6J/hn2ba7a2q3clywHM5QB+o8SyD/lMHk1D5x3edQB4AL56fiv3Te5/Ot2javcMTjgHPaOAfcPbqqfKI2EBvdqLu8BSv4VcReJ3dg4eMtTykuz1JzU44R7qCj79EJovJO86s"
            + "WmHL6jylyrCp2BbhWq4hK/DRlkFgkYYrFj4nANl2zNWtdSN17w6L7/lzMMbr3p9mJObyncGRzlo5zYpBq5UhcObQjTIHP8ADqDniW6YbZ2f1t6dwYeeRtl1FwsQhMreL5IGk8"
            + "l8rDp5sWkiKoOqMtb4qFrDpL5wdqPmFwveP3e0NYPp3X6bk6LDbWv03Vr14+TMq4TandSjVom9rLh2VsY5G0s3YuRL7QIIdBHKO1Opey9/Qg4S6a3IEVdbS0jnbwBPgJpIBXi"
            + "6IvZ56qj57YW9On1yY8/au9RDqNuYqyW7uJA+cA8BNODJRG/vDacVqFnIgSicBJ09o+wQybvbXtVs2xny1zWl3kWF7DC+IDiBfx/g/wAuVyaItNFsLtzOBwbxVwz5S7uB2KH2"
            + "BsHty7HsDl/VLLDTm2+PCUk4UXNX7RAgm62XRIcvpFVU42x14TTyaJ3CbZovEvDppiq9UEdaOvO04nWsW7bRgE7HNinoPhNdwjeePa13grQkhzQTRoWY8VdtuG0Hfx/L/P8Az"
            + "96sG92/vLVbtnuNf62qmpJDe/IHZ0O4s8NSgnFqrW6vTwfPoOOstkmW8LPSUk6nrHHrtY+LYtvMcFZulFXDby0CusadOOlt/v1k9+6YWuGtnBr5CNRL6Bxa0EtAo0guc40FWg"
            + "B1TpiNzb1xG15obS8Ln31xUsjbxcQOFfd4cFph/eRu5f8AsvG3/at9fZPMk/cdtD6+Z+nB8tQ33hj6vvPo3e8n7yN3MP2Xjb/tW+vsnj7jtofXzP04Plp94Y+r7z6N3vLZZws"
            + "7yvJndfGbntyI5C8MyapW4fa2quwqbSUJC+1E22PekRs+UnYcbBd6k891e7ho7JMHDVi+8n1wmUSH8mBqNufpliMTncThMTkhce0pnRueOW8RUdE1p0seK11k0Lm1pwPap3G7"
            + "qjv8fdZCSCaFlq3UQ8FpIoTwqPMtiPa/59L9x/jW85CuNOOdHKNNl2rXfwW6u3x+dUtajK5IhNlnvg6j9CPviDy/I9EPlGQEfMP4uhadvzZ7tj5wYV1w26PIZJrDNA8RcKU1v"
            + "7NPbXv7FJYDN2+4MeMjbNeyIvLaOFHAinaPyrYvlLU0mETCKpZ2vu7HzX2htLupy3JO2xe4Ne8QdS7X2rqvXkfUKHrZdT7uLLenCFdUt1VpvvU/vaErqLH1T1KSFAR84UlT+I"
            + "D7Cb76bYPF4/b4xUbre5yk8Ub5C58n9o2PxaXPpwLi6gLa9lR3UvEb1x+XnyEMNK48OL6H4ta/+krIO3u9Rv8A3x2buQ/OnjpQkeKW39YcjadpOvsZObre9CnYqvNOSs1OOE7"
            + "XrOtwiQzEVslZkVqpGODIFbguRx41QKj5LDpVY4zqZZbNy0vr9pcWbpiWh0PGkwAGiRx4GOtdQrWhHDjw+3GOdtmbc2lzLSF+kh/AgjT2jurqFPNxW4HtO7323ya7eXGXem95"
            + "9radt7Bqljf3WwMoOGrTaUkIzYNvr7VwnB19lHQ0f0i4lApiN0EiCYom6dTDmN+oGGs9v7xvsNj2GOzgla1rSS4irGOPFxJPEntKsmGycOZxcGUg/sZ2ah6CtiOU5SaYRMImET"
            + "CJhEwiYRMImETCJhEwiYRePi42JJ2m6Wm0zb9w/mbNaJ6xS794sou8eys3Lu5OReO1lRFVZ06eOjqKHMImMcwiPtHPrBtuWK0xtvaQgNiihYxoHYA1oAA9xfOHqdhZptxX93KC"
            + "50t3M6p873U9wcB5uC3KduDjZzf3VJr7u4RuGCl40/PNG71eF2jSabda8rKMTHauHcLbJyG94VixtBctTgoVdg+Kk4brFMUDkGJ6gb96c4m0G2upEbzi72Oo1W8ksT6HjpfG1x"
            + "bIw0IpR7SWuB71SdkdNepmRvjunpjLGzL2UlDpuI4pW1HAOZIWtdHIKgg1Y4amnvCt0cfuVHcvgWLOl8w+3vabt0R92v8AZOj7hpt2tLNvQFQMrOa9mNita85dyDkpzOlmcqxZ"
            + "AVTom0KAeEdNN17K6P3EjsjsDdMUArqbb3kV0NJrWjJ2wF4DR8EOje6o4yd63L2dvnrTAxuM6jbSlmNNLrmymtXahSlXwOnDCXGpcWyMbQ0Efl+jf3ZS7c/MSJRtlk48yOirpO"
            + "otHryY1Sox1Xa45VNE6SjCXq0USf1ku88Y/l1gjXJ1jlA5XBwHxGruI6x9QdrSmyjyDchZsJAE9Z2O87ZHaJ6eQF7aDgWjsV3v+lOxs/G2+Fg7H3bwCeTSFzfM6NuqCvlIYa9o"
            + "ce1Up+9D2rNW9s666sqtH5BSu25XakVabSpSbDSGtfsNGqMVJNYuAlpSfjZx9Fz5LFIC9bJCmyYG8yNXN5YFEoZsz0139f8AUWyubu6sW2sds5jOY2QuZI9wJc0NLQW6RpJq53"
            + "Bw4rG24MDbbDvLe0jvXTvmDnBjmaXNYCACSHEGpqOAbxB4KHHZ+sFg133VuCdgrT5zGPX/ACKotLerNjmTM4r+xXpqDZ49XwiHjbyNesjlBQo9QEqmejqVZxXGx8pFM0FrbR7x"
            + "X40fjafyOaCsh7Oy3rF1FEDXVX+Qqz/3tNkQ2jO7TxY3tK11e3LanrGlthtKyg8KwXnEqFs+xWVeLbPzMZMGKzgzf6ivp1QSObx+EemV7oPt6Pc3RrM4MSCC4vZ5oWyEag3VEx"
            + "pcQCCQK9lRXsqte+vG7LzavWbCZlkbp7Gwt45ZI2kNLqyPo0E1A1UpU19BUj/3nKq/mY3P+1xt/dbkB/tLv/r23/dn/tlNf7ucf9Q3X7zH+zT95yqv5mNz/tcbf3W4/wBpd/8A"
            + "Xtv+7P8A2yf7ucf9Q3X7zH+zUja33V5HnbwX7idt1zr27cc7VoDSHvGGs0bsdy7soylxr2wXLGWrszDQFQla1IV9SlCZNwkcyhjrgJDEFMetUvujDen+/ts4/K3UGTsspkNLm8"
            + "nSzTE+EOa5r3PDw4SiopSg41qrbjutv2+2DufJ4m1nxt/isfra4yh7tUrJyxzSxrdOkwnjxJJ7qcdVTjlZyYL2Q2G4g5N8gQv5+ep6sfaIbgvwbDPSfuxerlqhroFg+IjVsJwpV"
            + "vRC59P5oAbw9cy+zYmyT+IF2DONsvs79n+dyeSzl8znBuvRTTq7tXbThVYgd1E3/wD7eW54ZC5+1pz/ACOdrdr0coyaK/F08adlePasw6W7eneW3pqPW25ar3ILfGVraFLrt6go"
            + "6w8ueVTadZRVljG8qybS7eNqkrHoyCKDkpVSouV0wOA+E5g9uQmf6hfh/wBu5u7wN5tPXdWdw+F7mW1oWF0bi0luqRpoSOFQDTuU5t7Yn4i9x4K0z9nu+JlreW8czGvfcag2Roc"
            + "A6kRFRWhoSPOsm/qnu9r+0ulv0wOW/wBhMiPvb/Dt/lGT91s/2ymfup/Ep/nG3+kuf2K5ftyb85s8bu5rN9uXlHu+Z5BJTdclZR9J2K82XY5KxMoatbbYgbFUbpeoxndlIt9AJe"
            + "7ncW4BFqVy584iZTpGMtw6n7V6dbl6TRdUdlWJxj2SAcsMazWw3BtnB7I3FgcJPEHipIGkmh4fnS/d/UzbnVubpZvy9ZlInxkiYFx0SC2F03S57WuLTHwLTShNVDXtci7qVy709"
            + "ipcvLVy2QPG/kA9jrBBSDqInIKyMJrZMnES8NKx6zd/GSsY+QIu3cIqEWRWIU5DAYoDlw6t46zuMfsK0kY2SGXIWkcjXAOa4PbAHNc01BDgSCCKEGhVU6R53KRZLf14+RzHRWN1"
            + "NC4Egt5Zno4EcQQQCCOxfsds3Ym8vl/uUts3JtLZG3pFDmPU2DSy7Pu1kvs8yrsWXjy5ShWUtaZOVetIdrKuXa6bVNQqBF3KygFA6pxN2T7d2/gfxKYiwwVrBaYt2HfIWRMbG0u/"
            + "vYc4hoALjpAqeNAB2ALott2bqzv4Z8vkc7cy3OfblhBrkcXGhNo5rRXsFH1oOFST2krtXEft49zzdHGPSGx+M3N6Q03pSwUknwbrpvyL5C6+TgQjpqYjJtQKrQapJ1ZgMvYWjp6J"
            + "m65zL+o8xTooYwBH7v390a25uzJYndm3n5DNx3RLphBbPDmva18Y1SSNedLHNHEcKUHAAqU2lsrrfujaWLzG09xw47DPsmNELpJwQ+Nzo5DRkbmjU9p4AnyniSFIj9U93tf2l0t+"
            + "mBy3+wmV772/w7f5Rk/dbP8AbKf+6n8Sn+cbf6S5/YriODG9Oc/EXukwnAbk7yFnuQMVfos5LAWyXm37Vjot3Iazd7Cqdmolt2Ezi7pDrtF2hI+QZnInHrJrODeQoqm2cl9XUHa/"
            + "TbePSB/UjZmN9l3Vu+rWhrIy9jZxBI2RkZcw1rqY4HUKNGoAuafD0+3d1R2h1ib013zkWZWyuGUMg1O0SOgM8Zjc8NeOA0uBFDUmhIaVhTkXyM5r8y+f/KPTNC5uRHDTX/G2xXis"
            + "xQ2DfVm47a2ThaTeo7XTY0laKazNJWm8XWVW95FJJCqVBM6yLc6aSREzWDa+zuney+muIz2VwFzuDM5SOGR7YrdtzM0zQunGmNxoyJjBpJbSpoXAkkqvbo3z1L3l1My+38PuCy25"
            + "gcXJNGx883IifyZmwO1SU8Uj3nUATwFQOAAXC/4d+dP7eXjz/wDp1uP/AOPzu9sdNv8ATXOf9pj99dXqPVH/AFP27/3H+ZYd3g+558SKa23g07xFH3avWLLApEo+qOcd53dY1VHro"
            + "xEZJ/rO6shrVnrTNwQhXyLpF0j5agCdE5PF0ndvY7pfvK/dgbjYuRxcUsLyZ7jHtt2NoOwTNOpjz+aQQajga0UBuPN9Wdm49udtd+YjLzRzMAtre7E8j9R7TER4mD87geHaKVI2U9"
            + "xXukb6jO3dwfvWsZlfVmxuZFeklrxeagJY+VglKZEwMdaYuiquPXPKyNus9hBdq9RXF/HMmwppLeacFi4q6X9HdtXPU7PYzPA3WHwcrRFE7slMznui5lKB2mNhDmkaXuNSABRZW6p"
            + "9Z90WnS/A5XbYbbZzOROdJJ+pEIY2bQOJFZJBpdWrGjvK6Y07U3e2dtWzo3comm5nLdFwLdXmDyyFVAVkyqCioKFIVRFRITeEfAYxeoewRD256n9Wfw7MeWfZJ5oSKi1s+NO/jLX3"
            + "V0s6WfiUewP+2FuKgGnMueFe7hFRbBOB/B/uMaEX5AKcl+YT3c6OwdQvahq4jne28ti/A99WO+M2taYbCrUUWuGblXTD1cd5rv6v8D6pcxn1F3x0s3D7O+x2EdjvV7sPuKwW7ObFw"
            + "8HzcjtXYfC6jePasn9OdmdWNv8AtD7b5yLJme20W+mSY8qXj4jrjbQcR4m1dw7FXWuli5Ha4s0rSbZ3364SxV5x6CXJB8peetwjE3iRS+cm3sVR0tO1+R8Bh6GM3dKlKbqAiAgIBs"
            + "7YY3ZORtGXlv06uuTI2o5kOMhdTymOW6Y9tfI5oWr9/meoNheSWk3UexMsbiDyxkZmA+QSxWj43U7CWuPHzrq/3sbs/bws/wC3/uNf3AZ6/YGz/wDTqX9HEfxq8f2k35/qNb/Q5X+"
            + "BWY+OHOHlhxo5ScbHhudcxzG1JubYEJr+yM3F83ZsakSMe9tUHXrXCt2m/wCpUmzVq619nYmsgzkYpuVAVDpJqrOEfVsxidz9N9h7p2dlORt84HPWVu6aI0tmvJEb3scTayzRvjcY"
            + "3McxztXAkBp0uUntnqf1F2vvTFNu9wRbg25e3DYZqNnDWBz2McALmKGRsjRIx4c1ukggVd4mq9Pnz3X0MTCJhF49fKjVE9xd5b8iuPVk80JLU24LxU27lVo4YBLwTOddqViwNWrkC"
            + "qkYWKtrtHzYfaU6DghiiJRAR+kmzc9HlcFZZSI+Ce3jd21odI1Nr5WuqD5wtauo20mzXE0rW11Pc73TX/zUrOB0/wAyE9rJTHCNhuiS2zX4k0m9LpOJn52cQrQPmSDs9hi4Nq9SeV"
            + "ZZ8q3ScJPkVGKhzkIoUfEADadxT7MucPyN8mx9jPcG/wB6cxjNZBI0OeRSSgJBYQ4UJB4LWu2xW88ZmzNsoXwzTGk/3Zr3P0AiuprA7UypAcHgtNQCOKuQcUtyfMJ35uxJddNaaiY"
            + "p07K1cW3kXWGGv3kaQClFR07quvbJX7Yu1KAD7UYRQxjD7B6fRrHu3Bfhdx7HOtr7IOuw2oisJDOHebmTxyRA+mYUHcs27Tzv4rMhO1k1jjhYl1DNkIhAWjy8uCSOUj0QGp71vN0jO"
            + "X9JCRpG69papv8Au2HYxVht8FqOsSdTg6RD2AiycE0dQ85cLtYvLk3TB56KQkF2AyybVQ6DNIEFwDXDPwYwyNv8BaXltgHucyJ1zI2R8rmfCIcyKJlWgt1MYHcsuAc86mrZrAT5MR"
            + "Gxz93Z3OfY1r5W20bo2RB48I0vllfRxDtL3lvMDSWsGlyoMfMgBaZbud7PTnjySsREa60/H0hN6ZwLVCsq0SMk3hYcqvRIrA9ykZYx/K+oLsVuv1/F03d/D9bWp6YwPgDec65nMl"
            + "KV18wgavPywyle6nctSutWTurXqS+OUuELbaHl17NJbV2n/j1Vp3qMXYp47Se8+6hxkSbtZAYPUdhk98WuRZMzOU4iO1dGLzFfWfnAQI0ZSuwFIaNFQw+w74oAAmEAzh1ryEeF2J"
            + "elxbzrkCBgJoSZDR1PKRGHu/Ir50fupcrmGltTFBE57j3cRpaD5Kk8PQVvu7qFmbofMNdsyruyouG0q/0W2XZOSJrN3KMntWbaKJLIKgZNVNQodBKYBAQ9mYu6bZOS06IZyCNxa4"
            + "sveINCC63aBQhT29dle2epVjnnxh8UEljWoqCGXLnGteHAFW5/gSkf1Nqv/j0R/Q81i9p5L/ET/SO99Zu9lYv/AA1v9Gz3k+BKR/U2q/8Aj0R/Q8e08l/iJ/pHe+nsrF/4a3+jZ7y"
            + "hB3NWUJT+3LzfkoWIioby+Nm0nLk0ZHs4/wA70lUlDIiuLVFLzfJ80/h8XXw+Ien0jlw6d39yd/4ae4ke/l5CIjU4up4xWlSaVoPcVb3nhLa82dk8ZaRRsNzaPYQxobWoIFaAVpU0"
            + "9KpPO7//AOszGzXqPYPcjNEeZ4g/Brt+88PXr+MM2xblnffs65r4vs2Gf9SHLBh6cPPT5u3NBoM+Z+zu9ULK+7wV4jtmv/evb04VSXi8XruM2nHXi/2vOpEOfr/n65qJ1Gl5+/cxN"
            + "8bIzn3ZHLPuyLA4rZ+MxrhQwWUTKeTSwBTiylq0qoG1tv8A7b0jV/O+jWhE/K8QfR/ggYyv0dfxj1zaV2QP+2ZtjXw1p/8AqF6wQNnPHWg7t0+E3Hb5vZYhr7vBQq7U98GRtfzARv"
            + "UeP3Jxr5JSH8IB8sWbrbJQEPb7OnlZcuouVMzNlEnhFlrN3uCH3lVtq7AkxUO4joIOQxF3H6S90nD8upYy0NfPN+V85dz3qOoM+a8dGeZ4g+qCx+N5xL1/53/Xnpy2Vcev2Kuj8Ju"
            + "Dkb7rr331ztOnr4emmR21oPz2bhmpTtAjs+P/AMZ9xTZ7c3zIvAHitwm4+8ftrw3ISQ2FrKpSELZ3dPoFQlq2s9d2mfmkfdUjJ7Ig3zpJNjKJFOZRqj0VKYAASgBhofUPpJujd28r"
            + "7cVjPYttbl7C0SPlDxpiYw6g2FwHFp7HHhRZD2NdO2lta129LY3r323NGpghLSHzSSAjVM09jx2tHFTY/exu1/8A1a5U/wBl9B/veyl/cDvL/EY36Sb+HVs+1rfq/Ie5b/xC1lcWe"
            + "XdU7lvzF+teQPGuubBU1RFUs0tOrXCvIRkrW4SmaTkarKS1mbwcpY4uFYv7Y6bsmSh3hiLru26YiVVYEwyrmrefZHQa42rl5YTeGrBocS1zpbsShrNTWOcQyrneEUDXHiBVYmbtOX"
            + "MdWYd6CCSIc9r9L9OoMjtDCXO0Oe0Au4DxHtbWhNBB7kVsPi5prundzPW/cbjOSdU1bsrZ16mqunodhUE748WkdsRmxteTZhvY+6fgux0l0LsqyJTrqec38PQonELrg87uO66eYKX"
            + "ZL8e+/t7S3Y71rmmKkdsYJW/MkP5jZABQkDg6vcqjfdKcffbqyV7m4b02txd3b/7sYRKHS3QmjceeCwsdHUngXVLad5HX/vI+W0/693W/4rj1/I5z9v8AXH4u1v8Ar/lrv+57Y/6r"
            + "cn6WO+Qn3kfLaf8AXu63/Fcev5HHt/rj8Xa3/X/LT7ntj/qtyfpY75CmB3nr9pKL4B9l2R44P9iLaOlh3M51q42z7iJsZWvsZDV5UwtwVoicF70SduFSj6YPL8sC+0R6iNc6VZjMx"
            + "743VcZ71cZiSazMvI18mrWzj5vmEv00I+Ea1Xt3x05ssltfCYnEsuDYWNnfBgm0GUcx8Bo/lgMqXNd8EUp2K+vHD1j2I/jZtR/0oEHNKJOMjvSf5Vs9GKMaPIAo78zI+7y3ETlHF6"
            + "0aS0hsKR497jZUqPgCOFJ+RszrXtgRho+BIzAXZpx8+ORJmCXRT1JyeEQN0HLDs24s7Td2LusgWiyiyFu55dTSGtlYSXV4aQBV1eFK1UHuuzuchtfI2Fnq9ansZ426eDtT4nNGkji"
            + "HceBHEGi88rt8csuzBrnSc7Xu4px83XtHkB95VkeIWGmpzBotrR1YyvoREO7K23Hr7y5hpNtpJRcDMlDeFYnVYw9SJ7vb1uuq99k45tkZKytMULcB7JWMc50ut5c8F1tN4SwsAo4c"
            + "QfD3nXDbfSzZtraSM3Firy9ndNWJ8Mro2CLlxgM0tuYOIeJCfCeDh4u5s6v8d/yt/wCZnyX/AIiw/wD2dyn6fxEfXmM+jj/gVYvu26W/5eyf7zJ/HqFe8eXXb82tzI7f1b7duvtj"
            + "aq1VU910ta2VjYpHpHa93tm06SkvJxKj/YGw1vQOoaHapmTK6QTKsmYwI+I5znuGGut72O2Mu7fN3b3eSltpWsfC0NAibBJRpDYYRXW95rpJoe2gAFXy3S7COy1rc7ax9xZY+CSN"
            + "7myvMjnS86MlwJmmcBojYKagOHAVJJ9HN1sBqy2PH67dQ8q1UlYFOYjbG7TSaV+WenUnDLVyFeLnISXsMZH19Z49aIiLlu0WQXBM6JllEPn6ttF0CscgIix1l/ZV6zLVxNKk662B"
            + "FtbDL1RmEpXdqLy7GnCZ+lOrsGEm7koNdFVqc5lepkSogusqCIEXFf4mK/7v95/Bd49J90n3p+L3cz8fn/E3wl8B+D13i+L/AH19Twf8N4Pr+b0wiq1/M8dpi27VRQ7jXHGqPbFd"
            + "KPWWcFyapkC3F1Mz1ErTYUq9tqOjkUzPJN7SIhMI+aKkKihIZBq4KkCTN2qGxXRLfsNg/wCyGVkDIJHl1s5xoA9x8URPYNZ8TK9ry5tSXNCrW4bCKeAzSD5qlHH4vkcf6Pc49wo4"
            + "0AcVTR0HvzZemLjDbG1FsC2a1vcJ55Yu10ycf16eYFdoHaPUUpCOXQcA3dtlTJrJiIpqEMJTAIDm2RisMnaux2WhiuLGSmqOVrXsdQ1FWuBFQeINKg8RxWtO7dvXuMuvaGMklt72"
            + "OpZJE5zHtqCDRzSCAQSDQ8Rw7FYY4hdxTffIyd+HeW3ds21xp1/FNTeoexcLf5y2WhuYhSHj42R1vBoJt3K/XwmcSDoxkyiJipqj1INbzeydtYOw9c2ltDH5bLudwY4wRsZ5HO57"
            + "uI/oxt404lvArGFtubdOSypx+6t2ZPEYVjeMrDcSPf5WNEAqDTtfK6grwDzULben3ZeIvGOgJ8ZO2lGg/td0nxbWLlTyHXWhqoWyShGMe+27cXVgSbW/Yc00YJqKAk7YxTNt6dMr"
            + "do7S6MVcZv6Mb43hev3l1SeG2kEfzePsW65S0VLbaFsdY4GF1AXB8jiCS5wd4xeoutWw9l2keyelzC+7nk+dyF87lwtJ0h91O+Wks7w2pDS1gqGta0t8KiJ3JN/cGeb0M/h3dwtU"
            + "zPcUdBV+ia55LjElV3nyz3nOTUS2r1Mb6sk3EI6d6lXSjrHLzUu7RaLxcs/TM09ORVNjPe7Ym1+ovT24ZKbeKGPLXb5prJxPq1haMB1TSTDUGSgmOONgJ1sYQ4O+FFJ7o3R016j2"
            + "r4xcS3PsuFkEN7HT1i9u30+ZgiNDK0gOfIS3S1z2lpbTxblOwx2xZLg5pGd3DuKCNF8keQLKJXmoSQatySertasTC/r1BWEyZ3rCwTT1b3pPoCqUCLkZNFUirR5znwl1t6jR72zz"
            + "bHFO1YCyJaxwJpLIeD5fIW/mxmnwaurR6zX0o2Q/Zu3gL0f/AG90Q+WtKsH5kdR8UHxcaaiaUW4y08bePV42VX9zXTRmo7Zt2pjCDV9n2TXdTm9gVwazIOZeuDB2+RiXM9FjAyrx"
            + "Zyz8hcnpl1TqJ+ExhEcSQZnL2tk/HW11cR4+TVqjbI4Ru1AB2pgOk6gADUcQKFZOMUTniRzWl476CvDzrNWRq7Ewi65b6fU9g1eepF7rMDc6baot3CWaqWmIYT1csMM/SMg+iZqF"
            + "lEHUdJxzxEwkVRWTOmoUehgEM7re4ntJ2XNq98dzG4Oa5pLXNI7CCKEEdxC/HNa5pa4AtPcVhEeHHEk2tyadHjHoIdTJ2sb2TWY6ioY0Il2FgeKG3lqXuH3EWzDGKGb+uBD1PkCK"
            + "fj8I9Mk/tFn/AFz2j67d+v8AL0czmv16K10atWrTXjprSvGi6+RBo0aG6K1pQUr5aeVZwqVRqtBrEBSaNW4KnU6qRLGBrFVrEUxgq7XYOMbkaRsPCQ0Yg2jouMYNUypooIJkSTIU"
            + "ClKAB0yMuLie6nfc3T3SXEji5znEuc5x4kuJqSSe0niV2Na1oDWgBo7guw50r9WFyccOPpNvqcgiaP1KTe6xgOtuYuvaoXaSpwqqdGA6l9CK+JznClJFiOouuvu0oNv9yHgyS9sZ"
            + "Y4/2Sbq49lj/AJPMdyvha/gV0/D8fZ8LxdvFdfKi183S3meWgr2U7e3s4ehcHV+JXFmkDsIabxx0ZVB21CS9a2mNc1VSIb7x67YDvVJ2BvPu6Eb/ABVDzJ5JwZ02feei4FdQTlN4"
            + "zdeyfPZy55PrF5dSeruDotUrzy3NppcyrvCRQUIoRQUX4IYW10saNXbwHH0r52PD/ihGaznNLx3GnQzDUFnsza6WTVzPU1Fba+n7gzShUGlpmaejBkgJKwtUK3HETeLNzuCFYtwA"
            + "4Ain4eTtw55963JPvbo5BjNDZTK/mNYa1aH6tQadTuANPEfKU5EIYYwxugmtKClfLT8i6B+ro4A/mS8Uf0f9WfZbPX9r91/WV/8ATy/KXH1W2/Vs/RHvJ+ro4A/mS8Uf0f8AVn2W"
            + "x9r91/WV/wDTy/KT1W2/Vs/RHvLNep+PWhNCoy6Gj9Jal06lYTtFLAXV+uqjQvfyjAFwYqTZqvERZ5ZRkVyoCJnAqCkChgL0ARyMv8tlcqWnJ3NxcFldPNke/TXtpqJpWgrTtXYy"
            + "KKOvLa1tfIAP5Fxe1uMHGve8lGzW7ePulNvTUOxNGRE1szV1JvMxFRh1zujx0ZK2WEkn7Bgo5UMoZFJQiZjmEwl6j1zssM3mcWwx427ubeNxqRHK9gJ7KkNcAT5yvx8MUhrI1rj5"
            + "wCsUfq6OAP5kvFH9H/Vn2Wz3/a/df1lf/Ty/KXD1W2/Vs/RHvJ+ro4A/mS8Uf0f9WfZbH2v3X9ZX/wBPL8pPVbb9Wz9Ee8u82jhtxHvFQo+vrnxh0Ba6JrNlMxuuaZY9Q0Kaq1Dj"
            + "rEqzWn2FPgZGBcRdcZza0c3O7SaJIkcGQTFQDCQvTywbiz9tcS3dte3cd1MQZHtleHPLa6S9wdVxbU0JJpU0XJ0EDmhjmNLR2CgoPQpIEIVMpSEKUhCFAhCFAClKUoABSlKHQAKU"
            + "A6AGQ3au1f1hFFa2cFuFF8scxcLrxE4zWu2WF+4lLBZ7BozWcrYJ6UdnFR1Jzcw8rK0hLSLlQeqi7hRRU4/SYcnbfc+5LWFtvbZC9jt2CjWtmkDWgdgADqAeYcF0m3t3Eucxhce+"
            + "gXXf1dHAH8yXij+j/qz7LZ3fa/df1lf/AE8vyl+eq236tn6I95fZG9vnghDyUdMRPDLi3GS0RIMpaKk2GhtYNH8bKRrpJ7HSLB2hWSLtHzB4gRVFUhinTUIUxRAQAc4P3ZuiRhjk"
            + "yN86NwIIM8hBBFCCNXEEcCE9WtgaiNlfQFJaWo9LnpNCanKlWpiYbIt0G8rKQcY/kUEGjg7tqki9dNlXCabZ0qdRMAMAEOcwh0Ew9a+u9dLruhdOVitxdVjtb0xSLio6IjkzPqzC"
            + "O3rwsI2YNmD2SeKMPNfSZPdaCouD/lBXTKp1AwAIEX2fcdpXz/VfdDrD1Pk+m9R8A1XzvTe7fc/pvN91eP0/un+beX18Hp/yfTw+zCLKAgAgICACAh0EB9oCA/SAh+EBwirH9w/5"
            + "ZfjLygsc7t7i3YGvFXbsyd3IzFYYQYSOj7bMrrHcC8Vq8edq/wBfu3SqpvOViPOZeEpfBHlN4znzvsvrjlsHGyw3HG6+sW0AkDqXDG9nEu8MwHdrLX+WQigFEzuzfXY3HFPZHWvz"
            + "UgJiP9RzfFDXvoJIxTwxAkk6BbF8tx3T6FPPYyuUXV20IlmuKbOy1HbtQh2UogAAJXCMff3lOmGwG69BIsgQwGD8IdBHYXEdfOnLoWy3N7LbvI+BJbzlw9PKZKz3Hla47p6QbxvZ"
            + "nCzx3Md8Zk9vyz6DLLFJT+tG30LPulvl7e5TYZhFheK1qzUMYVMVV524bQgrA3DwCUBbtmOtPjmQXdnAREgKERRHp9ZUvsyXvPxN9OsTBzLGS6vp+5kcL2flLpxGAPRU+ZY2H4Xt/"
            + "Z245d4y2sLc9r5JWSH0BsJkJPpIHnVl7gf2XuO3DqZidn296ffW94sUHMRdrPCtouqUZ+ic6hX2v6R6qVTj5tMTEAJV+7fv0zJAdoLLzFUz6v8AU7r1uzqK12OaBYbePbBE4l0g/"
            + "wDek4F4/oANZxNQ7gVs90q6BbP6XtF7DqvtwkcbiUDweaFnERjz1LjQcR2LchmDFnRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImET"
            + "CJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCJhEwiYRMImETCL/9k=";
        }else if(parseInt(invoice.Societa) === {$smarty.const.ECOLIBERA}){
            return "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY5NzQ1OEM4Nzc1NzExRTU4MEI4REFBMDM4M0FEOTMzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY5NzQ1OEM3Nzc1NzExRTU4MEI4REFBMDM4M0FEOTMzIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEM0I1RTNEQjcwQzQxMUU1OUI1MUM4OTEwOEZFNTkyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEM0I1RTNEQzcwQzQxMUU1OUI1MUM4OTEwOEZFNTkyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwMBAQEBAQEBAgEBAgICAQICAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//AABEIAJ4CXAMBEQACEQEDEQH/xAELAAEAAwEBAAIDAQAAAAAAAAAACAkKBwYBBQIDBAsBAQACAgMBAQEAAAAAAAAAAAAHCAYJAQQFCgMCEAAABQMCAQUJCgcIDAgPAAABAgMEBQAGBxEIEiETFAkZMUFR1ZZX1xhYYSKUFZUWVtYXl5GhMmIj09RxsdFTsydnt/CBwVKi0jOTJCamp+HxQpJjtLVmckOjVGQlRVVlpTaGtkcKEQABAwIDAgUKDQoRCAoCAwABAAIDBAURBgchEjFBURMIYXGRk9MUVFUXGIHRIlKS0pS01NUWVhmhsTJiciNjFWUJ4UKCorJDU7MkZHSk5HWVtWbwwcIzc6PjxIM0RIQlNUWFxSfiRiY3KP/aAAwDAQACEQMRAD8A38URKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIoc5y3u4dwu5eQBHh75vVoJ0l7btty3FvGOSahzE9Oqc6yjFSmASnSSK6dJG/LRKA61BWovSAyXkCR9ui37nmBmIMEBG7G7kmmOLIzxFrRJI0/ZRgbVi14zdarS4wb3PVY4WNI2Hkc7gHWGJHGFXBevWPZwuFdULWUtewGPEPRyRkS2nZMExHUCun9yEkWS6gBycSTNANO9ry1UvMXSm1UusjhZW0lrpsfUiOJs0mH2z6gSMceq2JnWWCVefLtO497GKFnFgA4+iXYg+g0Llp9725Q5uMctvwEeXQkFaBC/8AMJb5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"
            + "gYdQTbRVsQcegmQBH3hQI310Dk4hEe6I1RzWaR9VqZdZJDiWzMYOoGQxtA+ooaztM6TNNYXE7Htb6DWNH+ZWIdVLhuyZKybtzRNQ7CZu5K9XVn285kmqLsLcYRMLByrl5FFWIcjWTk3M7zai5Q50iKBSkMUqioGnLo3ZQs8lpqc2VcLJboKswRFwDuaayON5czH7F7zJgXDaGtABAc4HPdMbRRyUct4maH1XPGNpIB3A1rXEt5CS7AnhwGAO043JVapS2lESiJREoiURKIvrpSIiZxkrGzcXHTEcv8A5ZhKMm0gyW5BD9K1dpLIKcgj3Sj3a/Genp6qMw1LGSQnha5ocD1wQQvzlhinYY5mtfGeEOAI7B2KL2Sdj22LJzJZCSxbA2u/O3WQbzmPmyNkyLRRY3EZ2LaESQgpV0Go6DIM3hNB/J7mke3/AEj0+zDGRU22CCow2SU4FO8H133sNa4/7Rrx1FjVxyXlu5MLZKZkT8CA6Ic2Rjx4N9Q4/dtcuhvLsxntnxdZcHet7JR0LaNrQNoRD2aU6TcNxJ2xDMopNZKNjkDvJOSXRakUX6OgJCHPqPAUQr0b1mnKummXqd2Z69sNLDCyJjpPVTTGNgbi2ONpfI84Au3GYAnE7oXoc/b8u2yCnqpt2GGJkbS7a5240NxwAxJIGJwHYUaHnWU4BauFEUIPJ8imQwlK7Z2/bhG6oAOgHTLIXgwdAU3e40ij4QqEqjpc6ZwymOOlvUrAfsmQU4aeqN+qY7stBXhPz7ZWuwDKhw5Q1uH1Xg/UX8naY4H+iuWfkKz/AK+V+HnfabeAX3tNL8NX8/L6zfudT7FndE7THA/0Vyz8hWf9fKed9pt4Bfe00vw1Pl9Zv3Op9izuidpjgf6K5Z+QrP8Ar5TzvtNvAL72ml+Gp8vrN+51PsWd0TtMcD/RXLPyFZ/18p532m3gF97TS/DU+X1m/c6n2LO6J2mOB/orln5Cs/6+U877TbwC+9ppfhqfL6zfudT7FndE7THA/wBFcs/IVn/XynnfabeAX3tNL8NT5fWb9zqfYs7ovvrW6w/Cl3XPblpxts5QRkbnnoi3o9Z9C2omySezUg3jWqrtRC9XK6bVNdyUVDETUOBAEQKYeQfTsvSp0+vt4pLJSUV6bVVlTFAwvhpgwPle2NpeW1biGguBcQ1xAxwBOxftT54tNTUR00cdQHyPa0YtZhi4gDH74dm3bsKnnVmFmS5/kvKFj4htZ3eN/TjeDhWpioJmUAyzyRfKFOZCNimKIGcyEg4BMwlTTKPCQpjnEqZTGLjea822DJVnffMx1DaegYcBxue84kRxsHqnvdgcABsALnENBI6VwuNHa6Y1Va8MiHZJ4gBwknk9E7ASq25vrT4FCRcJW7iCQkoohxBq+mbzbwr9cmo6HXjGVtTrdqYQ7xXav7tVRuPTCpo6p7LTYJZqIH1L5atsT3DlMbKeZresJXddYFLqNAJCIKVzo+IukDSeuA1wHsivqe1UL5kkvvHP9RK6Hni1Xzbb7vPwNfn5Rx4J/vf+GnaqF8ySX3jn+olPPFqvm233efgaeUceCf73/hr0kX1kV3TiXPwu2e4JhDu89F3VLyCWmmv+UaY6WJ3Pdr+29MKtf9hloHrVxP8Aya9enzNfqyIT0lmq5YDwOYJHNPothIX1kn1nkrCrg1mdvz2JciAiDeTvl6wXEAHQRBJ1j9JTQB9yjumFWsOD8tAHq1xH/JroVOfKmjk5qrt8kUvI95aew6IFfXdqoXzJJfeOf6iV/Hni1Xzbb7vPwNdfyjjwT/e/8NfIdaoTUNcJJiHfAMkHAf7QjYY1yOmLU47cttw/l/8AQ08o48E/3v8Aw1MPb/vJxXn10W3487q0745lRYLTnlUDHkU0UxVcKW/Jo8LeYK3SATHTEiDoCFMfmebKJ6nbTPXPKWpMgtsAkocw7pPe0xad8AYuMMg9TLujaQQyTAF25uguWUWTNVtvTuYZjFWYfYOw28u6eB2HJsPHhhtUtqmpZMqr+uLNwbMpMf6SLED/AMvI1ZbonnDVuP8Aq+p+sxUg/ODN3ujvMPyxRfspFnv2ArcW83boHhyRFB3v4h3V6tcXE6SX/g/8vf8AXatUHRWjw6RGUT+WI/2LltgrT+vo+VbGbOtK2/YHyjd2JLvtDMUjcdmPGbKUe23b9lPIRdV9FMJdIzBzJ5Bh3yqZW0iQphUbJCBwMAAIABhshkvovZ+z1lekzZaKyzx26sY5zGzS1LZAGvdGd8MpJGg4sJGD3bMOPYKUandPDSLSjPdx09zFbcyTXq2SMZK+mp6J8Di+KOYc26W4QyEbsjQd6Np3gQARgTKHbPuWsTdVj15krHkVdkPBMbnkrTVaXmwh46WNIxbCJkXCyaEJPXEzFkdCZSAhhXBQTlMAkAAATRhqVptfNLMwMy3mCakmrn0rJw6ndI+Pce+RgBMkULt7GN2I3cMCMCdoE66Ia25V18yfJnbJ9PcKa1RV0lIWVkcMcvORRxSOcGwT1DNwtmaATIHYh2LQACY2da+bh2KZgN4JDGn48oWeFZ50YzhrTav9nV+851E/TpG90Y8wD8Nbv7ypFlz2qLa7odtweHPmHg73fyHbtbItTHHyb5g4P/I673rKtJ2hseGtmTz/AIptPv8Ap1pz329YzGbNp+AsRhjR9fl6XRapbrYOXc43gbXjWC8rKQyIu1UWsnLSDwjuJVMZuRFuQUxLouAiIF1z6L6CVGrFFPep7iyitFNU8y4NjMkz3BjJDuguYxrd14AcXOOOPqMMMd0XSc6XFH0fLpS5YpbNLdMx1tCKljnzNgpo2OlkiG8Q2SV7w6JxLAxgLS3CUEkChXM3Whbvcx9LZDkIcaW854y/N/FTdS0wBI2peBS5OkvbyWA6Y8JyjIgifl/RgA6VdnKPRz0qyluzCgFxr2/ttaRPt6kWDacbdoPNbw9ctXWonTQ6QGofOUxu/wCJrS/H7xbGml2chqN59WcRscO+Aw7fUDHBQIXfSUzIKOHKz6VlZJzxKrrqLPpB+8cqacSiigquXTldU3dETHMYe+NTgwQUkAjjEcVNG3YAA1rWgcQGAAA6wAVWJe+7jVmWZ0k9dM/EucXPke9x4STi5znHrkle/uzDuYbCg4y5r4xVkWz7cmSFUip257LuGCiH5TnEifRpGTjmzRQymgCUvHxGIYpgASmKI+HbM4ZVvVZJbrPc7fVV8RwfHDURSPby4tY4uGHHs2HEHaCspvum2f8AK9thvOZLJdrfaagYxzVFJUQxPBOA3ZJI2tOPCBjiQQRsIJ/djDO2X8LyXxtirI932I6MqVZynb807aR0gYmnCWWh+M8RMJBwh+jdILE5A5OQK/PMmT8q5vp+9cz2+krYgMAZY2ue37iTDfjPVY5p6q/bJWo2f9OKzv8AyLeLha5y4FwgmeyOQj91ixMUo+1lY9uwbNitawv12WZrX6JG5rsS2spRpOBNe4IAxbGu/hHQqjpwk1bPrVkTkANSopMY8DDqAqBqAhWTN3RAyjct6oyfW1FtqDiRFJ/CIOoAXFszRyudJLh608d6dOfzjmo1k5uj1ItlFfKMYAzwfwKq6rnBrX00hHCGNhgx4C8cVvODOsv2k50UZRjDIBcfXU85shLUyiihaTxRwoIEI3ZTijp3aMkusqPCkihIHcqDp+iARAKqxnPo9an5Ma+onoe/7YzH79RkztAHG6MBs7ABtLnRBg9dsV+dNOmNoRqY6OjpbqLVfJMAKa5AUry47A1kxc6lkcTsa1k5kds9QMcFPopimKUxTAYpgAxTFEBKYohqBiiHIICHcGoSIIOB4VaMEOAc04gr5rhcrzl23fa1h29KXbelwxFrWzCtxdSs7Ov28bGMUQMBCmXdOlE0gOqoYCJkAROooYCFATCAD6NptF0vtwitNmp5qq5TO3WRRNL3uPUa0E7BtJ4AASSACV42YMxWHKdnnzBmasp6Cx0zN6WeeRscTG8HqnOIGJJAaOFziGtBcQFWjdvXC7RralF46KSypfaCKhkwmLSs6MQi1hIIgJ0Pnlc9oyR0xEOQwtgAQ5Q5KsnaeiFq1cqVtRVOtVDI4Y83PUPLx1+94ahmP6tUjzD+cb6PNkr3UdAy/wB1iaSOepKOJsTsONvflVSSEch5sYry3bT7WfoHn7yWx36U69XzMdUPD7B2+r+ArwPpNNB/FGbvctu+NU7afaz9A8/eS2O/SnTzMdUPD7B2+r+Ap9JpoP4ozd7lt3xqnbT7WfoHn7yWx36U6eZjqh4fYO31fwFPpNNB/FGbvctu+NU7afaz9A8/eS2O/SnTzMdUPD7B2+r+Ap9JpoP4ozd7lt3xqnbT7WfoHn7yWx36U6eZjqh4fYO31fwFPpNNB/FGbvctu+NV/Wx657am7dJN3Fp5yi0lDAU759adlqNUAEdBOqSMyNIvRKXujwInN4Ar8Z+hrqnDEZI6uxyvA+xbPUhx6g36Rjey4Bdmk/OW6B1E7YZrdmqCNx2vkpKItb1SIrjI/D7ljj1FYVhfcFh7cJbyly4iviJu5i1MknKNEOfYzkIusBhSQm4CSRaTEWZUUzgmZZEqa/AYUjHKGtV9znkDN+n9wFtzbQy0k7sSxxwdHIBwmOVhdG/DEYhriW4gODScFcLTPV7TnWCzuvenl0p7jSxkCVjd5k8DnY4NngkDJoicDul7A1+BLHOAxXZaw5SSlEUI88dYXtf2+TDu17rvN1ct4x6hkpK0bAjguWWi1ich20q7M6YW9Fvkzchmrh8m5JrqKYBy1NeROj7qdqBRsudqo2U1nkGLKiqfzMbxxFjd18r2nieyIsPE7FVf1X6YWhekFxksV/uUldmSE4SUlBH3zLERwtleXR08TxxxSTtlHGwDaow9tNtZ+gefR935rY85fw5TAak7zMdUPD7B2+r+AqC/pM9B/FGbvctu+NE7afaz9A8/eS2O/SnTzMdUPD7B2+r+Ap9JpoP4ozd7lt3xqnbT7WfoHn7yWx36U6eZjqh4fYO31fwFPpNNB/FGbvctu+NU7afaz9A8/eS2O/SnTzMdUPD7B2+r+Ap9JpoP4ozd7lt3xqp17YN0FgbsbDmMh46iLwhoWEu59ZjtresfCx0opKMIaCnFl26EHcFxtDsDNLhRKUxlyKCoU4CQAApjQZqdpjftKb7Dl7MU1HNWz0jahrqZ8j2BjpJYgCZYoXb+9E4kBpGBb6rEkC1mheumUukDlOpzjk2muNLbKW4vo3trY4Y5TLHDBOXNbBUVLDGWVDACXh28HAtAALvudxm4Sy9seNHWU79jLnlreaTETCKM7RZRT+ZF1MKqItVCN5magGQtyGTHnBFwBgDuFNXT070/vOpmZG5WsUtLDcHwySB1Q57I92MAuBMccrsTjs9RhykL0tZtYMtaG5Jkz7myCuqLPHUxQllIyKSbfmJDSGzTU7N0EeqPOAjiBVffbT7WfoHn7yWx36U6n/zMdUPD7B2+r+AqoP0mmg/ijN3uW3fGqdtPtZ+gefvJbHfpTp5mOqHh9g7fV/AU+k00H8UZu9y2741Ttp9rP0Dz95LY79KdPMx1Q8PsHb6v4Cn0mmg/ijN3uW3fGqdtPtZ+gefvJbHfpTp5mOqHh9g7fV/AU+k00H8UZu9y2741Ttp9rP0Dz95LY79KdPMx1Q8PsHb6v4Cn0mmg/ijN3uW3fGqdtPtZ+gefvJbHfpTp5mOqHh9g7fV/AU+k00H8UZu9y2741QOum2s6/wD0Hn0PdG1seaB7vJlMRp5mOqHh9g7fV/AVz9JnoP4ozd7lt3xopQ4G6wfbDuFl2tsWjejm3byfnBOOs+/Y8LamZRU35LeJc9JfQEs+OIDwtmz1VyIAIgnwhrUYZ76P+pun1I653ajZUWeMYvqKV/PRsHLIMGyxt+3fG1n"
            + "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"
            + "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"
            + "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"
            + "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"
            + "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sPoOAwPohvXUIru2sZ/sdRUs/ii8BRR1FR9CxprnjCkDuKHkbbPLMkiCH9+coh3BAB5KrxfdI9TsuucLlZa7m28L4ozURgcpkg5xgHXI7KxGpy5e6M4TU0uA42jfHZZiFxd7DSEWqKElHPY5co6Ci+aOGioD4BTcJpHAeTwVHdTT1lG/m6uKSKTke0tPYcAV5ToZIzhI1zT1Rh6S/NjEv5FUEI5g8frDpoiyarOlR15ORNBM5+/X8QQ1NW/m6WN8snIxpcewASuWQvkO6xpceoMV2i0tsme72UTJb+J7yOktwik9lolW3Ys4DycRJW4hi445Q7+io6Vnlk0l1MzE5rbXZLgWO4HyRGCM9XnJ+ajPoOXrU2XrzVkCGmlw5SN0dl2A+qpr4x6sy6ZBRu+yzeUfbzH3iikDaIfG80oUdONBeXeoIxEasXl98kk/IP71g8n9EW9VT21Od6+KlpthMNN99mPKHSvaIoz1WtnCyy36f1DyH3KVrGetZ6p3W3j6kegHKz3FWDsYYXjTR2PrWZRCq6RE5CZV4n0/K8GhtZGZdCo8WTFQOMESmI3TMI8CZQ5KuFkvTrJ+QKQ0uV6OOB7gA+U+rmkw9fK7F5GO3dBDGn7FrVIVttFvtMe5QxhpI2u4XO67jt9DgHEAus1my9JKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJRF8CAGASmADAPIICACAh7oDyDXBAIwPAiAUCgBSgBSh3AAAAA/cAOQKAADAcCL5rlEoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIlESiJREoiURKIv/2Q==";
        }
    }


    function getBackgroundImage(invoice){
        if(parseInt(invoice.Societa) === {$smarty.const.FINLIBERA}){
            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACbAAAA20CAIAAACh3m5aAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAA1Y1JREFUeNrs2QENADAQxKC9f9E3Hw3Y4LY9AAAAAAAAgKITogAAAAAAAECVEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAACALCEKAAAAAAAAZAlRAAAAAAAAIEuIAgAAAAAAAFlCFAAAAAAAAMgSogAAAAAAAECWEAUAAAAAAACyhCgAAAAAAACQJUQBAAAAAD5797bbNrJFUZTi//+yiJPTbnWnE9vRjWStVWM8BnkqQ2QBE3sTAKgliAIAAAAAAAC1BFEAAAAAAACgliAKAAAAAAAA1BJEAQAAAAAAgFqCKAAAAAAAAFBLEAUAAAAAAABqCaIAAAAAAABALUEUAAAAAAAAqCWIAgAAAAAAALUEUQAAAAAAAKCWIAoAAAAAAADUEkQBAAAAAACAWoIoAAAAAAAAUEsQBQAAAAAAAGoJogAAAAAAAEAtQRQAAAAAAACoJYgCAAAAAAAAtQRRAAAAAAAAoJYgCgAAAAAAANQSRAEAAAAAAIBagigAAAAAAABQSxAFAAAAAAAAagmiAAAAAAAAQC1BFAAAAAAAAKgliAIAAAAAAAC1BFEAAAAAAACgliAKAAAAAAAA1BJEAQAAAAAAgFqCKAAAAAAAAFBLEAUAAAAAAABqCaIAAAAAAABALUEUAAAAAAAAqCWIAgAAAAAAALUEUQAAAAAAAKCWIAoAAAAAAADUEkQBAAAAAACAWoIoAAAAAAAAUEsQBQAAAAAAAGoJogAAAAAAAEAtQRQAAAAAAACoJYgCAAAAAAAAtQRRAAAAAAAAoJYgCgAAAAAAANQSRAEAAAAAAIBagigAAAAAAABQSxAFAAAAAAAAagmiAAAAAAAAQC1BFAAAAAAAAKgliAIAAAAAAAC1BFEAAAAAAACgliAKAAAAAAAA1BJEAQAAAAAAgFqCKAAAAAAAAFBLEAUAAAAAAABqCaIAAAAAAABALUEUAAAAAAAAqCWIAgAAAAAAALUEUQAAAAAAAKCWIAoAAAAAAADUEkQBAAAAAACAWoIoAAAAAAAAUEsQBQAAAAAAAGoJogAAAAAAAEAtQRQAAAAAAACoJYgCAAAAAAAAtQRRAAAAAAAAoJYgCgAAAAAAANQSRAEAAAAAAIBagigAAAAAAABQSxAFAAAAAAAAagmiAAAAAAAAQC1BFAAAAAAAAKgliAIAAAAAAAC1BFEAAAAAAACgliAKAAAAAAAA1BJEAQAAAAAAgFqCKAAAAAAAAFBLEAUAAAAAAABqCaIAAAAAAABALUEUAAAAAAAAqCWIAgAAAAAAALUEUQAAAAAAAKCWIAoAAAAAAADUEkQBAAAAAACAWoIoAAAAAAAAUEsQBQAAAAAAAGoJogAAAAAAAEAtQRQAAAAAAACoJYgCAAAAAAAAtQRRAAAAAAAAoJYgCgAAAAAAANQSRAEAAAAAAIBagigAAAAAAABQSxAFAAAAAAAAagmiAAAAAAAAQC1BFAAAAAAAAKgliAIAAAAAAAC1BFEAAAAAAACgliAKAAAAAAAA1BJEAQAAAAAAgFqCKAAAAAAAAFBLEAUAAAAAAABqCaIAAAAAAABALUEUAAAAAAAAqCWIAgAAAAAAALUEUQAAAAAAAKCWIAoAAAAAAADUEkQBAAAAAACAWoIoAAAAAAAAUEsQBQAAAAAAAGoJogAAAAAAAEAtQRQAAAAAAACoJYgCAAAAAAAAtQRRAAAAAAAAoJYgCgAAAAAAANQSRAEAAAAAAIBagigAAAAAAABQSxAFAAAAAAAAagmiAAAAAAAAQC1BFAAAAAAAAKgliAIAAAAAAAC1BFEAAAAAAACgliAKAAAAAAAA1BJEAQAAAAAAgFqCKAAAAAAAAFBLEAUAAAAAAABqCaIAAAAAAABALUEUAAAAAAAAqCWIAgAAAAAAALUEUQAAAAAAAKCWIAoAAAAAAADUEkQBAAAAAACAWoIoAAAAAAAAUEsQBQAAAAAAAGoJogAAAAAAAEAtQRQAAAAAAACoJYgCAAAAAAAAtQRRAAAAAAAAoJYgCgAAAAAAANQSRAEAAAAAAIBagigAAAAAAABQSxAFAAAAAAAAagmiAAAAAAAAQC1BFAAAAAAAAKgliAIAAAAAAAC1BFEAAAAAAACgliAKAAAAAAAA1BJEAQAAAAAAgFqCKAAAAAAAAFBLEAUAAAAAAABqCaIAAAAAAABALUEUAAAAAAAAqCWIAgAAAAAAALUEUQAAAAAAAKCWIAoAAAAAAADUEkQBAAAAAACAWoIoAAAAAAAAUEsQBQAAAAAAAGoJogAAAAAAAEAtQRQAAAAAAACoJYgCAAAAAAAAtQRRAAAAAAAAoJYgCgAAAAAAANQSRAEAAAAAAIBagigAAAAAAABQSxAFAAAAAAAAagmiAAAAAAAAQC1BFAAAAAAAAKgliAIAAAAAAAC1BFEAAAAAAACgliAKAAAAAAAA1BJEAQAAAAAAgFqCKAAAAAAAAFBLEAUAAAAAAABqCaIAAAAAAABALUEUAAAAAAAAqCWIAgAAAAAAALUEUQAAAAAAAKCWIAoAAAA"
            + "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"
            + "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"
            + "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"
            + "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"
            + "AAUnIkFADoRhAFgNQEUQAAIJnWmoUMANCTIAoAqQmiAABADo6EAgBnKaXUWo0DAGSdyu0mAAAAkemgAMDpBFEAyD2V21YAAAAC0kEBgDgEUQDIPZXbXwAAAOLQQQGAgARRAMg9ldtoAAAATqeDAgCRCaIAkHsqt+MAAACc4msxooMCAPEJogCQeyq39QAAAPTkMCgAkI4gCgC5p3LbEAAAQAc6KACQlyAKALmncvsRAADAQa4F1LoDAEhNEAWA3FO5jQkAAGBfDoMCAIMRRAEg91RukwIAANiFDgoAjEoQBYDcU7ndCgAAYAsdFAAYniAKALmnctsWAADAq64vg1pQAAAzEEQBIPdUbv8CAAB4ksOgAMCcBFEAyD2V28sAAAAe00EBgMkJogCQeyq3qQEAAPxIBwUA+CKIAkDuqdzuBgAAcEsHBQC4I4gCQO6p3DYHAADwtS7QQQEAfiSIAkDuqdx+BwAATMthUACAZwiiAJB7Krf3AQAAs9FBAQBeIogCQO6p3CYIAABMQgcFAFhtWRaDAABJCaIAADCyawH15Q8AsIUgCgB5CaIAADAgh0EBAPYliAJAXoIoAAAM4noS1Ec+AMDuaq2lFOMAABkJogAAkJvDoAAAHQiiAJCXIAoAAPk4DAoA0JkgCgB5CaIAAJCGw6AAAGcppdRajQMApJzHbaYAAEBkDoMCAASxLItBAICMBFEAAIjIYVAAgGgEUQBIShAFAIAoRFAAgMg8IwoASQmiAABwpmsB9WUOABCcZ0QBIOskbtsFAAA68ywoAEBSbs0FgIwEUQAA6EEEBQAYgCAKABkJogAAcBQRFABgMJ4RBYCMBFEAANiTN0EBAAbmGVEASDmD26YBAIAtHAMFAJiHIAoAKWdwuzYAAPAqERQAYFqeEQWAdARRAAB41seFoQAAmJZnRAEgHUEUAAD+oIMCAHAliAJAOoIoAAD8TAcFAOA7z4gCQL7p2/4OAADc0kEBAHhAEAWAfNO3jR4AAHjTQQEAeNqyLAYBABIRRAEAmJoOCgDAqwRRAMhFEAUAYEY6KAAAqwmiAJCLIAoAwCxEUAAAdlFrLaUYBwDIQhAFAGBkX5+7OigAADsSRAEgF0EUAIChXAvo9b8CAMC+BFEAyEUQBQAgsevXrAIKAEA3gigA5CKIAgCQiStwAQA4nSAKALkIogAAhKaAAgAQjSAKALkIogAAhCOCAgAQmSAKALkIogAAhCCCAgCQhSAKALkIogAAnEYEBQAgo2VZDAIAJCKIAgDQlQgKAEB2gigA5CKIAgBwOBEUAICRCKIAkIsgCgDAIURQAABG5Q1RAMhFEAUAYDfX/OkjEwCAgQmiAJCLIAoAwEq37dNXJQAA8yil1FqNAwCkmbttXQEA8KfrR6P8CQAAb54RBYBUBFEAAO45+gkAAI+5NRcAEhFEAQD4H89/AgDASxwSBYAsBFEAgHl9XBgKAAB4lUOiAJCFIAoAMJHrGVAfgQAAsFEppdZqHAAgwaxtLwwAYGwiKAAAHMQhUQBIQRAFABjN7VOgPvYA4EdfAcNECWz/MXFIFAASTNk+/QEAslNAAeB5d/WitWb2BLZYlsUgAED0VYCPfgCAXORPAFjtx8st39/fjQyw7w8LABCKIAoAEJ1HQAFgF79FC0EU2MKtuQCQYL62rQYAEI0CCgD7epArPmfb1pohArZway4ARF8R2GUDADiXK3AB4FCPb7N0PBTYThAFgOAEUQCA3hRQAOjmcQ1trZmLgaN/agCA0wmiAACHU0ABoL9nXvVzPBTo9oMDAJw5WduSAwDYnQIKAOd6Jk44HgrsyK25ABB6geDTHwBgOwUUAOJ48u5Kx0OBHQmiABCZIAoA8LLrF9TH/zMgABDHkzXU8VDglB8fAOAUgigAwN8cAAWA+J5/w+9zNm+tGTHglJ8gAOCEmdqOHgDArdvTn2/yJwAk8VKKcDwUOIJbcwEg7nrBAgAAmNw1fPouAoCkXrqp0vFQ4CCCKACEJYgCANNRQAFgJK++2+d4KBDk5wgA6EYQBQBm8XFhKABgDCte7HM8FAj1owQAdJqm7QkCAAMTQQFgVOvCw/v7u6EDjuPWXAAIunywPwgADMaNuAAwvHX3UjoeChxNEAWAmARRAGAEIigAzGP1K32OhwJhf6AAgEMJogBAViIoAExodWxwPBTowDOiABB0jraBCADEd/1iuUZQYwIAs9mYGRwPBfpway4ARFxN2E8EAE7x4/nOuwMfPlQAgOtHwpYa6ngo0I0gCgARFxT2GQGAo90e6/TtAQC8avsVlI6HAt14RhQAIq4pbEoCAEe4Hv30sQEAbLG9hrbWfJAAiX61AID9J2hLAgBgLx8XhgIA2MUuB60cDwU6c2suAEQjiAIA6/34DigAwC52qaGOhwL9CaIAEI0gCgC84PrlIIICAIfapYZ+fq601gwmkPEXDADYkSAKAPzjt6+C2whqlACADvZqCY6HAqfwjCgAhJudLQwAYCrf66aPAQAglL1qqOOhwIncmgsAoQiiADCy6xufb8InABBeudjl383xUOBEbs0FgFhrDWsDABiAc58AQHb73jDpeChwLkEUAGItN+yWAkAud8nTVA4ADGD3cvD+/m5UgRN5RhQAYk3NdlEBILLb/GnWBgDGc0QzcDwUiMAzogAQaN1haxUAQvHqJwAwiX1fDL3leCgQgVtzASDQ6sNOKwCcyAFQAGBOx3UCx0OB4X/oAIBXCaIA0I/nPwEAjn5Xz/FQYJKfOwDghXnZViwA7Ot2br0roAAAkzv6vJTjoUAonhEFgCAEUQBYQ/UEAHhJn5NSjocCobg1FwCirEds3QLAb75XT/MmAMAKfZJAa83XGhCKW3MBIMqkbKkAAJ72BAA4SM8Y4HgoEJBbcwEgxMLEni8As7mtnuZBAIDj9KyhjocCMbk1FwBCrE2sFgAY3rV9mvUAALrp2QA+P/Naa8YcCMituQAQYka2NQxAOtfJ68EW28eF4QIA6K/ziSjHQ4HI3JoLAKcTRAGI6HZ6evJu2+uOm6kNAOBcnWuo46FAcIIoAJxOEAXgZNeZyKOeAADZnXIz5Pv7u5EHIvOMKACcv1Sx7wzA0b4f93wTPgEAhnNKDXU8FPDzCAD8PR3bjwZgF6onAMDMzjr/5HgokIJbcwHgXIIoAE+5my8kTwAArs6qoY6HAn4nAYBnCKIAU/txFvjxrCcAAHx37j2QjocCfi0BgKfmYjvdAGNzky0AAAc5d3/f8VAgF7fmAsCZixd74gDDuOudfuEBADjO6dc/Oh4K+NkEAJ4kiAKkpH0CAHCi07f1W2u+gYF0HBIFgLMIogBxue0WAIBogjyD53gokJFDogBw2kLGxjpAH7dPHP22/vGbDABAZEFqqOOhgF9RAOC1WdgSAuBQtx0UAADyinOwyfFQIC+35gLAKQRRgKP4u3UAAMZQLnxmA2zk1lwAOGdRYxUBcATbNAAAjCHUBY/uXwH8qAIAa6Zg+/UAu7NNAwDAGKKdZPJ3h8AA3JoLAP0JogD7E0QBAMgu4Bkmn9nAGNyaCwAnLHAEUYDd2akBACC1mJv17+/v/l8DDMCtuQBwwvwriALsThAFACCvmDXUNzYwErfmAkBngijAIfz1OgAA6UQ+tOQDG/B7CwCsn3wFUYAj+AN2AAByifymna9rYDwOiQJAT4IowFH8DTsAACnEP6jk0xoYT+Q/QwGAAVc9gijAQfwZOwAA8cXfkf/8qLZ3AYzHrbkA0HXmtagAOI69GwAAwkqxF++vDIGBuTUXAPotf+zUAxzH9g0AADFluarRnxgCfooBgO0EUYBj2cEBACDWRkCeSxr9fSHgBxkA2GfatU0PcLT393eDAADA+VsAFz6kAYJwSBQAOq2GBFGAo/nDdgAATpduz91XNDADh0QBoNOcK4gCdOBv2wEAOG3ln3O33Sc0MIllWQwCABy+LBJEATrw5+0AAJyw5s92R+7V58ez/QpgEm7NBYAeiyMLDIA+7OkAANBT3h12f00ITMWtuQDQY8K1Ow/QjVu/AADoIPthI39KCMzGrbkAcDRBFKAff+oOAMCxi/z8x4x8MwN+vQGA/WdbQRSgJ3/tDgDAIcv7UTbT3aoCzMkhUQA4dsVkXx6gM1s8AADsubC/GOD/Fn8+CEwr+23nABB93WSlAdCZS8AAANhnST9QCvWdDPhJd2suABw41QqiAP35y3cAADYt5sdKoV/cpAJMziFRADhwDWVHHuAUtnsAAFizjB8xhb45HgrgkCgAHDrPCqIAp7DjAwDAqwY+POTvBQE+LctiEADgCIIowGlcnMv/sXcvSG0rQRRAQd7/klW8qoB4gRhbEiOpP+fsIE4VM7evewwAsFLtdxRdjAE6/LUHgAspRAGuZPQDAMBj5Yfjnk4B+JslUQA4gkIU4GIeBwMA4K4me0LuwwAN//gDwMkUogAX8414AAC+Z/XX12maOvxLvZgC0PYIAIBTT1jBA+ByxkAAAHyk9E5zcF8NBLjLq7kAMD5qGcEDRKATBQDons8Xff7JHssFuMuruQAwPnCZvwMEYR4EANBWw9m3bwQCPGBJFADGUogCROHFMACAhnquAbn6AjgdAOBMClGAQAyGAAD66Dzs9jgKwFOWRAFgIIUoQCyeDgMAqB/FX1+naXLjBeABS6IAMDKFCSEA0ZgQAQCUDeGLtp+AN1EA1h8Znb89AwCDD1Yzd4BoDIkAAEqy6/PisVyALbyaCwCjKEQBItKJAgBUogp95ykUgE0siQLAsFNVFAGISScKAFCAKtT9FuA3LIkCwBAKUYC4fIMeACBx3rbW8xdtKMA+vlgDAGMCmlE7QGQ6UQCAfEl74aP45KdDAXazJAoAA2KaOTtAcIZHAACJWOX5ly/5AThZAOBaClGA6DwvBgCQgoG12yzAQSyJAsAvKUQBEjBFAgCITBXqHgvgoAGAyBSiADmYJQEAhEvUfiv0Gb/+ADDqxJmmyecAAPsPU4UoQBZ+ewkAIEqWVoW6vgKcy5IoAPwqxAknAIkYKgEAXJyiVaHreOAEYPgBZEkUAPafpAbrALnoRAEALmE1Zz1tKICTCABCUYgC5KMTBQA4kwH0Vn46FOAIlkQBYP8xaqQOkJEZEwDA4YHZ67i7+PYewHFut5sPAQD25DspBSAjr5ABABzHSqhrKkBMlkQBYOcZqhAFSMqwCQBgcEK2EuqCChCeJVEA2BP3FKIAeRk5AQCMycYWbkbwsw4AziwACHqAKkQBUtOJAgDsj8RWQsfx06EAp7EkCgCb05+4ApCd2RMAwOYwrAodyrf0AE4+xSyJAsC209MMHaAAnSgAwKoMrAc9gDYU4HyWRAFgWxg0QAeoQScKAPAo/apCXUQBap1rlkQBYMPRKbQAlGEUBQDwPfTqQV1BAYqyJAoAG7Kh3AJQiYEUAMBH3LU6czyP5QI46QAgx7lpbg5QjE4UAGidcq2EnkUbCnA5S6IAsDYqGpoD1KMTBQA65ltVqDsnQL+zz5IoAKw6NKUXgJLMpwCARsnWONhtE6ArS6IAsCo2CjAAVXnEDAAob5omK6HumQCd+VYQAKw6MRWiAIWZVQEAValC3TABcCYCwEoKUYDiTKwAgGo51irMpTyWC+BkBIB8x6UYA1CeThQAKJJgFz6Kq2hDAWKyJAoAT+KkJAPQhOkVAJCaUe/lfM0OICxLogDw5Kw0HAfoQycKAKQMrhZDA9CGAgTnm0MA8ChXmowDtKITBQByMd51jQRgpdvt5kMAgLsUogDt+HY/AJAgrNoKjUQbCpCCbxEBwI8ZU6QBaEgnCgBEDKhLA2qY6+oIwD6WRAHgft5UiAK05Zv+AECIXGoZNDBtKEC6U3WaJp8DAHw/Io3CATrTiQIA12RRy6BJzPPsQwDIxZIoANwJoebg"
            + "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"
            + "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"
            + "AAAAAAAAoCyBKAAAAAAAAFCWQBQAAAAAAAAoSyAKAAAAAAAAlCUQBQAAAAAAAMoSiAIAAAAAAABlCUQBAAAAAACAsgSiAAAAAAAAQFkCUQAAAAAAAKAsgSgAAAAAAABQlkAUAAAAAAAAKEsgCgAAAAAAAJQlEAUAAAAAAADKEogCAAAAAAAAZQlEAQAAAAAAgLIEogAAAAAAAEBZAlEAAAAAAACgLIEoAAAAAAAAUJZAFAAAAAAAAChLIAoAAAAAAACUJRAFAAAAAAAAyhKIAgAAAAAAAGUJRAEAAAAAAICyBKIAAAAAAABAWQJRAAAAAAAAoCyBKAAAAAAAAFCWQBQAAAAAAAAoSyAKAAAAAAAAlCUQBQAAAAAAAMoSiAIAAAAAAABlCUQBAAAAAACAsgSiAAAAAAAAQFkCUQAAAAAAAKAsgSgAAAAAAABQlkAUAAAAAAAAKEsgCgAAAAAAAJQlEAUAAAAAAADKEogCAAAAAAAAZQlEAQAAAAAAgLIEogAAAAAAAEBZAlEAAAAAAACgLIEoAAAAAAAAUJZAFAAAAAAAAChLIAoAAAAAAACUJRAFAAAAAAAAyhKIAgAAAAAAAGUJRAEAAAAAAICyBKIAAAAAAABAWQJRAAAAAAAAoCyBKAAAAAAAAFCWQBQAAAAAAAAoSyAKAAAAAAAAlCUQBQAAAAAAAMoSiAIAAAAAAABlCUQBAAAAAACAsgSiAAAAAAAAQFkCUQAAAAAAAKAsgSgAAAAAAABQlkAUAAAAAAAAKEsgCgAAAAAAAJQlEAUAAAAAAADKEogCAAAAAAAAZQlEAQAAAAAAgLIEogAAAAAAAEBZAlEAAAAAAACgLIEoAAAAAAAAUJZAFAAAAAAAAChLIAoAAAAAAACUJRAFAAAAAAAAyhKIAgAAAAAAAGUJRAEAAAAAAICyBKIAAAAAAABAWQJRAAAAAAAAoCyBKAAAAAAAAFCWQBQAAAAAAAAoSyAKAAAAAAAAlCUQBQAAAAAAAMoSiAIAAAAAAABlCUQBAAAAAACAsgSiAAAAAAAAQFkCUQAAAAAAAKAsgSgAAAAAAABQlkAUAAAAAAAAKEsgCgAAAAAAAJQlEAUAAAAAAADKEogCAAAAAAAAZQlEAQAAAAAAgLIEogAAAAAAAEBZAlEAAAAAAACgLIEoAAAAAAAAUJZAFAAAAAAAAChLIAoAAAAAAACUJRAFAAAAAAAAyhKIAgAAAAAAAGUJRAEAAAAAAICyBKIAAAAAAABAWQJRAAAAAAAAoCyBKAAAAAAAAFCWQBQAAAAAAAAoSyAKAAAAAAAAlCUQBQAAAAAAAMoSiAIAAAAAAABlCUQBAAAAAACAsgSiAAAAAAAAQFkCUQAAAAAAAKAsgSgAAAAAAABQlkAUAAAAAAAAKEsgCgAAAAAAAJQlEAUAAAAAAADKEogCAAAAAAAAZQlEAQAAAAAAgLIEogAAAAAAAEBZAlEAAAAAAACgLIEoAAAAAAAAUJZAFAAAAAAAAChLIAoAAAAAAACUJRAFAAAAAAAAyhKIAgAAAAAAAGUJRAEAAAAAAICyBKIAAAAAAABAWQJRAAAAAAAAoCyBKAAAAAAAAFCWQBQAAAAAAAAoSyAKAAAAAAAAlCUQBQAAAAAAAMoSiAIAAAAAAABlCUQBAAAAAACAsgSiAAAAAAAAQFkCUQAAAAAAAKAsgSgAAAAAAABQlkAUAAAAAAAAKEsgCgAAAAAAAJQlEAUAAAAAAADKEogCAAAAAAAAZQlEAQAAAAAAgLIEogAAAAAAAEBZAlEAAAAAAACgLIEoAAAAAAAAUJZAFAAAAAAAAChLIAoAAAAAAACUJRAFAAAAAAAAyhKIAv9jzw5kAAAAAAb5W9/jK40AAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIEnt2IAMAAAAwyN/6Hl9pBAAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwJUQBAAAAAACALSEKAAAAAAAAbAlRAAAAAAAAYEuIAgAAAAAAAFtCFAAAAAAAANgSogAAAAAAAMCWEAUAAAAAAAC2hCgAAAAAAACwlQDt2YEMAAAAwCB/63t8pZEQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAAB"
            + "sCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2AqcJIbAi4ZMFwAAAABJRU5ErkJggg==";
        }else if(parseInt(invoice.Societa) === {$smarty.const.ECOLIBERA}){
            return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACbAAAA20CAIAAACh3m5aAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAA/udJREFUeNrs2UERACAAwzDAv+fho5dI6Ld32wEAAAAAAAAoehIAAAAAAAAAVYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAAACQZYgCAAAAAAAAWYYoAAAAAAAAkGWIAgAAAAAAAFmGKAAAAAAAAJBliAIAAAAAAABZhigAAAAAwGfvXtTbyI00gBIA8/4PvAKw3U1ZI9uyxEtfq8/58nk8yWbjKZMmin9XAQAISyAKAAAAAAAAhCUQBQAAAAAAAMISiAIAAAAAAABhCUQBAAAAAACAsASiAAAAAAAAQFgCUQAAAAAAACAsgSgAAAAAAAAQlkAUAAAAAAAACEsgCgAAAAAAAIQlEAUAAAAAAADCEogCAAAAAAAAYQlEAQAAAAAAgLAEogAAAAAAAEBYAlEAAAAAAAAgLIEoAAAAAAAAEJZAFAAAAAAAAAhLIAoAAAAAAACEJRAFAAAAAAAAwhKIAgAAAAAAAGEJRAEAAAAAAICwBKIAAAAAAABAWAJRAAAAAAAAICyBKAAAAAAAABCWQBQAAAAAAAAISyAKAAAAAAAAhCUQBQAAAAAAAMISiAIAAAAAAABhCUQBAAAAAACAsASiAAAAAAAAQFgCUQAAAAAAACAsgSgAAAAAAAAQlkAUAAAAAAAACEsgCgAAAAAAAIQlEAUAAAAAAADCEogCAAAAAAAAYQlEAQAAAAAAgLAEogAAAAAAAEBYAlEAAAAAAAAgLIEoAAAAAAAAEJZAFAAAAAAAAAhLIAoAAAAAAACEJRAFAAAAAAAAwhKIAgAAAAAAAGEJRAEAAAAAAICwBKIAAAAAAABAWAJRAAAAAAAAICyBKAAAAAAAABCWQBQAAAAAAAAISyAKAAAAAAAAhCUQBQAAAAAAAMISiAIAAAAAAABhCUQBAAAAAACAsASiAAAAAAAAQFgCUQAAAAAAACAsgSgAAAAAAAAQlkAUAAAAAAAACEsgCgAAAAAAAIQlEAUAAAAAAADCEogCAAAAAAAAYQlEAQAAAAAAgLAEogAAAAAAAEBYAlEAAAAAAAAgLIEoAAAAAAAAEJZAFAAAAAAAAAhLIAoAAAAAAACEJRAFAAAAAAAAwhKIAgAAAAAAAGEJRAEAAAAAAICwBKIAAAAAAABAWAJRAAAAAAAAICyBKAAAAAAAABCWQBQAAAAAAAAISyAKAAAAAAAAhCUQBQAAAAAAAMISiAIAAAAAAABhCUQBAAAAAACAsASiAAAAAAAAQFgCUQAAAAAAACAsgSgAAAAAAAAQlkAUAAAAAAAACEsgCgAAAAAAAIQlEAUAAAAAAADCEogCAAAAAAAAYQlEAQAAAAAAgLAEogAAAAAAAEBYAlEAAAAAAAAgLIEoAAAAAAAAEJZAFAAAAAAAAAhLIAoAAAAAAACEJRAFAAAAAAAAwhKIAgAAAAAAAGEJRAEAAAAAAICwBKIAAAAAAABAWAJRAAAAAAAAICyBKAAAAAAAABCWQBQAAAAAAAAISyAKAAAAAAAAhCUQBQAAAAAAAMISiAIAAAAAAABhCUQBAAAAAACAsASiAAAAAAAAQFgCUQAAAAAAACAsgSgAAAAAAAAQlkAUAAAAAAAACEsgCgAAAAAAAIQlEAUAAAAAAADCEogCAAAAAAAAYQlEAQAAAAAAgLAEogAAAAAAAEBYAlEAAAAAAAAgLIEoAAAAAAAAEJZAFAAAAAAAAAhLIAoAAAAAAACEJRAFAAAAAAAAwhKIAgAAAAAAAGEJRAEAAAAAAICwBKIAAAAAAABAWAJRAAAAAAAAICyBKAAAAAAAABCWQBQAAAAAAAAISyAKAAAAAAAAhCUQBQAAAAAAAMISiAIAAAAAAABhCUQBAAAAAACAsASiAAAAAAAAQFgCUQAAAAAAACAsgSgAAAAAAAAQlkAUAAAAAAAACEsgCgAAAAAAAIQlEAUAAAAAAADCEogCAAAAAAAAYQlEAQAAAAAAgLAEogAAAAAAAEBYAlEAAAAAAAAgLIEoAAAAAAAAEJZAFAAAAAAAAAhLIAoAAAAAAACEJRAFAAAAAAAAwhKIAgAAAAAAAGEJRAEAAAAAAICwBKIAAAAAAABAWAJRAAAAAAAAICyBKAAAAAAAABCWQBQAAAAAAAAISyAKAAAAAAAAhCUQBQAAAAAAAMISiAIAAAAAAABhCUQBAAAAAACAsASiAAAAAAAAQFgCUQAAAAAAACAsgSgAAAAAAAAQlkAUAAAAAAAACEsgCgAAAAAAAIQlEAUAAAAAAADCEogCAAAAAAAAYQlEAQAAAAAAgLAEogAAAAAAAEBYAlEAAAAAAAAgLIEoAAAAAAAAEJZAFAAAAAAAAAhLIAoAAAAAAACEJRAFAAAAAAAAwhKIAgAAAAAAAGEJRAEAAAAAAICwrkoAAAAAHEvv/Yn/6EcppSf+IwAAYOcE"
            + "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"
            + "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"
            + "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"
            + "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"
            + "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"
            + "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"
            + "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"
            + "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"
            + "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"
            + "Ncmejgcx2dKYX3z/J/tU/gEAAD4YoASRAEAgI07Hg9fDUbDsBv/6PTfmJ540ug+u/D2UkB9FgAAgGunKiM9AADAlcYsejg4VMrdpvRz9dy966AAAAD8YtQSRAEAAL5reobUsVGuGbxnRXMY9p/+keoJAABwx7nM9A4AAPBL42B1Hq+O73+lPlfP7rM9/bA7/6BxAgAALGNwM6IDAADc1WXsms1fx/ksZi5b9NisdwIAAKx9sjN4AwAALMqnY9rXs9vxqz+KjXvvL56d8uS3PsgXf+fw8X9xqZ4AAAAUJkpBFAAAYDv+mAHf/3r87DDrAwfUqUcOs0OZ2iQAAAC/njcFUQAAAL42TY23eiH1ww20rp8FAADgvgRRAAAAfu6aoVLvBAAA4In+8wkAAAD4MbETAACAhdv7BAAAAAAAAECVIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAliAKAAAAAAAAZAmiAAAAAAAAQJYgCgAAAAAAAGQJogAAAAAAAECWIAoAAAAAAABkCaIAAAAAAABAl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JYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAAAAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAIAtIQoAAAAAAABsCVEAAAAAAABgS4gCAAAAAAAAW0IUAAAAAAAA2BKiAA"
            + "AAAAAAwJYQBQAAAAAAALaEKAAAAAAAALAlRAEAAAAAAICtAFFxEr5GvvO5AAAAAElFTkSuQmCC";
        }
    }

    function infoDestinatario(invoice){
        var table;
        invoice.Data = new Date(invoice.Data);
        if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
            table = {
                        widths: ['*', '*', 'auto'],
                        body: [
                                [ '', '', { text: 'Milano, ' + invoice.Data.ddmmyyyy() , color: colorText, alignment: 'left' }],
                                [ '', '', ''],
                                [ '', '', { text: 'Gent.le', color: colorText, alignment: 'left', margin: [0, 10, 0, 0] }],
                                [ '', '', { text: inquilino.Nome + ' ' + inquilino.Cognome, color: colorText, alignment: 'left', margin: [0, 0] }],
                                [ '', '', { text: inquilino.Indirizzo + ' ' + inquilino.Civico, color: colorText, alignment: 'left', margin: [0, -5] }],
                                [ '', '', checkInquilino_Indirizzo(inquilino)],
                                [ '', '', ''],
                                [ '', '', { text: appartamento.Indirizzo + ' ' + appartamento.Civico, color: colorText, alignment: 'left' }],
                                [ '', '', { text: appartamento.CAP + ' ' + appartamento.Citta, color: colorText, alignment: 'left', margin: [0, -5] }],
                                [ '', '', ''],
                                [ '', '', checkInquilino_CF(inquilino, invoice)],

                        ]
                    };
        }else if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_CLIENTI}){
            table = {
                        widths: ['*', '*', 'auto'],
                        body: [
                                [ '', '', { text: 'Milano, ' + invoice.Data.ddmmyyyy() , color: colorText, alignment: 'left' }],
                                [ '', '', ''],
                                [ '', '', { text: 'Gent.le', color: colorText, alignment: 'left', margin: [0, 10, 0, 0] }],
                                [ '', '', { text: cliente.Nome + ' ' + cliente.Cognome, color: colorText, alignment: 'left', margin: [0, 0] }],
                                [ '', '', { text: cliente.Indirizzo, color: colorText, alignment: 'left' }],
                                [ '', '', ''],
                                [ '', '', { text: 'CF: ' + cliente.CodiceFiscale, color: getTextColor(invoice), bold: true, alignment: 'left' }],

                        ]
                    };
        }

        return table;
    }

    function checkInquilino_Indirizzo(inquilino){
        var indirizzo;
        if(inquilino.CAP !== '' && inquilino.Citta !== '' && inquilino.CAP !== null && inquilino.Citta !== null){
            indirizzo = {  text: inquilino.CAP + ' ' + inquilino.Citta, color: colorText, alignment: 'left'  };
        }else{
            indirizzo = {  text: 'Campo Mancante', color: 'red', alignment: 'left'  };
        }

        return indirizzo;
    }

    function checkInquilino_CF(inquilino, invoice){
        var cf;
        if(inquilino.CodiceFiscale !== '' && inquilino.CodiceFiscale !== null){
            cf = {  text: 'CF: ' + inquilino.CodiceFiscale, color: getTextColor(invoice), bold: true, alignment: 'left'  };
        }else{
            cf = {  text: 'Campo Mancante', color: 'red', alignment: 'left'  };
        }

        return cf;
    }

    function getTextColor(invoice){
        if(parseInt(invoice.Societa) === {$smarty.const.FINLIBERA}){
            return '#444444';
        }else if(parseInt(invoice.Societa) === {$smarty.const.ECOLIBERA}){
            return '#444444';
        }
    }

    function getTitoloTipologia(invoice){
        var titolo;
        var numero, data;
        //{ text: 'Fattura n.' + invoice.Numero + '/' + invoice.Data.getFullYear().toString().substr(2,2), color: colorText, margin: [0, 30, 0, 10], style: 'contenuto', },

        if(invoice.Numero !== '' && invoice.Numero !== null){
            numero = invoice.Numero;
        }else{
            numero = 'campo mancante';
        }

        if(invoice.Data !== '' && invoice.Data !== null){
            data = invoice.Data.getFullYear().toString().substr(2,2);
        }else{
            data = 'campo mancante';
        }

        if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_STORNO}){
            var storno;
            if(parseInt(fattura_storno.Tipologia) === {$smarty.const.STORNO_TOTALE}){
                storno = { text: 'Storno totale ' + fatturaStornata.Numero + '/' + fatturaStornata.Data.getFullYear().toString().substr(2,2), color: getTextColor(invoice), aligment: 'left', style: 'contenuto' };
            }else{
                storno = { text: 'Storno parziale ' + fatturaStornata.Numero + '/' + fatturaStornata.Data.getFullYear().toString().substr(2,2), color: getTextColor(invoice), aligment: 'left', style: 'contenuto' };
            }

            titolo = { stack: [
                                { text: [
                                   { text: 'Nota di credito n. ' + numero + '/' + data, color: getTextColor(invoice), bold: true, aligment: 'left', style: 'contenuto' }
                                ], aligment : 'left' },
                                { text: [
                                   storno
                                ], aligment : 'left' }
                    ], margin: [0, 0, 0, 10]};

        }else{
            titolo = { text: [
                                   { text: 'Fattura n. ' + numero + '/' + data, color: getTextColor(invoice), bold: true, aligment: 'left', style: 'contenuto'  }
                                ], aligment : 'left' };
        }

        return titolo;
    }

    function contenuto(invoice){
        var data;

        if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_NONE}){
            data = getContenuto_NONE();
        }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_PI}){
            data = getContenuto_FPI(invoice);
        }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_LOCAZIONE}){
            data = getContenuto_FDiL();
        }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_CHIUSURA}){
            data = getContenuto_FDiC();
        }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_STORNO}){
            data = getContenuto_FDiSTORNO();
        }

        return data;
    }

    function getContenuto_FPI(){
        var data = [];
        var p1, p2;
        p1 =   [
                {  text: 'Modalità di pagamento:' , color: colorText, alignment: 'left',  margin: [0, 0, 0, 10], style: 'contenuto', },
                getCoordinateBancarie(invoice),
            ];

        var p3 = {
                    table : {
                        widths: [ 'auto', '*', 100],
                        body: []
                    },
                    margin: [0, 10, 0, 0],
                    layout: 'noBorders',
                    color: colorText,
                    lineHeight: 1.5,
                    style: 'contenuto',
                    bold: true
                };
        var p4 = {
                    table : {
                        widths: [ 'auto', '*', 100],
                        body: []
                    },
                    margin: [0, 10, 0, 0],
                    layout: 'noBorders',
                    color: colorText,
                    lineHeight: 1.5,
                    style: 'contenuto',
                    bold: true
                };

        if(getCausale(invoice, fdi).success){
            p1.push(getCausale(invoice, fdi).data);
        }

        var elems_fdi = [25];
        var elems_fcd = [];

        var obj;
        if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
            obj = {
                elems_fdi : elems_fdi,
                elems_fcd : elems_fcd,
                fdi : fdi,
                fcd : fcd
            };
        }else{
            obj = {
                elems_fdc : elems_fdi,
                fdc : fdc
            };
        }

        p2 = insertSpecificElems(invoice, obj);
        p2.color = getTextColor(invoice);
        p2.bold = true;

        data.push(p1, p2);

        var elementi;
        if(parseInt(invoice.Tipologia) !== {$smarty.const.FATTURA_STORNO}){
            elementi = insertElems(invoice, obj);
        }else{
            elementi = insertElems(fatturaStornata, obj);
        }

        var size = 25;
        for (var i=0, x=0; i<elementi.length; i+=size, x++) {
            var smallarray = elementi.slice(i,i+size);
            var data_elems = {
                table : {
                    widths: [ 'auto', '*', 100],
                    body: [],

                },
                layout: 'noBorders',
                style: 'contenuto',
                color: colorText,
            };

            if(x > 0){
                data_elems.pageBreak = 'before';
            }

            data_elems.table.body = smallarray;
            data.push(data_elems);
        }

        if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
            p3.table.body.push(getTotale(invoice, { fdi : fdi, fcd : fcd }));
        }else{
            p3.table.body.push(getTotale(invoice, { fdc : fdc }));
        }

        var el = [{ text: '* Soggetto ad IVA', alignment: 'left' }, '', ''];
        p4.table.body.push(el);

        data.push(p3, p4);
        //data.push(p3);

        return data;

    }

    //Stile precedente : DA CANCELLARE
    function getContenuto_FPI_pre(invoice){
        var data = [];
        var p1, p2, p4;

        var p3 = {
                    table : {
                        widths: [ 'auto', '*', 100],
                        body: []
                    },
                    layout: 'noBorders',
                    //margin: [0, 10, 0, 0],
                    color: colorText,
                    lineHeight: 1.5,
                    style: 'contenuto',
                };

        var p5 = {
                    table : {
                        widths: [ 'auto', '*', 100],
                        body: []
                    },
                    margin: [0, 10, 0, 0],
                    layout: 'noBorders',
                    color: colorText,
                    lineHeight: 1.5,
                    style: 'contenuto',
                    bold: true
                };

        p1 =   [
            {  text: 'Modalità di pagamento:' , color: colorText, alignment: 'left',  margin: [0, 0, 0, 10], style: 'contenuto', },
            getCoordinateBancarie(invoice),
        ];

        if(getCausale(invoice, fdi).success){
            p1.push(getCausale(invoice, fdi).data);
        }

        var elems_fdi = [32];
        var elems_fcd = [9];

        var obj = {
            elems_fdi : elems_fdi,
            elems_fcd : elems_fcd,
            fdi : fdi,
            fcd : fcd
        }

        var subTotale = {
            elems_fdi : [32, 25],
            elems_fcd : [9, 4],
            fdi : fdi,
            fcd : fcd
        }

        p2 = insertSpecificElems(invoice,obj);
        p2.color = getTextColor(invoice);
        p2.bold = true;

        p2.table.body.push(getTotaleSelected(invoice,obj));

        var locazione, esenteIva, marcaDaBollo;

        if(getFDI(fdi, 25).success){
            locazione = [{ text: 'Locazione in ' + appartamento.Indirizzo + ' ' + appartamento.Civico + ' ' + appartamento.Citta + ' - Stanza ' + stanza.Numero, alignment: 'left' }, '', { text: getFDI(fdi, 25).elem.Totale + ' €', alignment: 'left' }];
        }

        esenteIva = [{ text: "Esente IVA ai sensi dell'art. 10 c.1 n.8 del DPR 633/1972 ", alignment: 'left', italics: true }, '', ''];

        if(getFCD(fcd, 4).success){
            marcaDaBollo = [{ text: getFCD(fcd, 4).elem.Titolo, alignment: 'left',}, '', getFCD(fcd, 4).elem.Prezzo + ' €'];
        }

        p3.table.body.push(locazione, esenteIva, marcaDaBollo);

        if(parseInt(invoice.Tipologia) !== {$smarty.const.FATTURA_STORNO}){
            data.push(p1);
        }

        data.push(p2, p3);

        var elementi = insertElems(invoice, subTotale);
        elementi.unshift(getTotaleSelected(invoice, subTotale));
        elementi[0][0].text = 'Totale Fattura';

        var size = 19;
        for (var i=0, x=0; i<elementi.length; i+=size, x++) {
            var smallarray = elementi.slice(i,i+size);
            var data_elems = {
                table : {
                    widths: [ 'auto', '*', 100],
                    body: [],

                },
                layout: 'noBorders',
                style: 'contenuto',
                color: colorText,
            };

            if(x > 0){
                data_elems.pageBreak = 'before';
            }

            data_elems.table.body = smallarray;
            data.push(data_elems);
        }

        p5.table.body.push(getTotale(invoice, { fdi : fdi, fcd : fcd }));

        data.push(p5);

        return data;
    }

    function getContenuto_FDiSTORNO(){
        var data = [];
        data = contenuto(fatturaStornata);

        return data;
    }

    function getContenuto_FDiC(){
        var data = [];
        var coordinateBancarie = getCoordinateBancarie(invoice);
        //coordinateBancarie.margin = [0, 0, 0, 10];
        var p1;
        p1 =   [
            {  text: 'Modalità di pagamento:' , color: colorText, alignment: 'left',  margin: [0, 0, 0, 10], style: 'contenuto', },
            coordinateBancarie,
        ];

        var p3 = {
                    table : {
                        widths: [ 'auto', '*', 100],
                        body: []
                    },
                    margin: [0, 10, 0, 0],
                    layout: 'noBorders',
                    color: colorText,
                    lineHeight: 1.5,
                    style: 'contenuto',
                    bold: true
                };
        var p4 = {
                    table : {
                        widths: [ 'auto', '*', 100],
                        body: []
                    },
                    margin: [0, 10, 0, 0],
                    layout: 'noBorders',
                    color: colorText,
                    lineHeight: 1.5,
                    style: 'contenuto',
                    bold: true
                };

        if(getCausale(invoice, fdi).success){
            var causale = getCausale(invoice, fdi).data;
            causale.margin = [0,0,0,10];
            p1.push(causale);
        }

        var obj = {
            elems_fdi : [32],
            elems_fcd : [],
            fdi : fdi,
            fcd : fcd
        };

        if(parseInt(invoice.Tipologia) !== {$smarty.const.FATTURA_STORNO}){
            data.push(p1);
        }

        var elementi = insertElems(invoice, obj);

        //inserimento dell'IVA
        if(countFDI(fdi, 32) > 0 && getFDI(fdi, 32).success){
            var el = [{ text: getFDI(fdi, 32).elem.Titolo , alignment: 'left' }, '', { text: getFDI(fdi, 32).elem.Totale + ' €', alignment: 'left' }];
            elementi.push(el);
        }

        var size = 25;
        for (var i=0, x=0; i<elementi.length; i+=size, x++) {
            var smallarray = elementi.slice(i,i+size);
            var data_elems = {
                table : {
                    widths: [ 'auto', '*', 100],
                    body: [],

                },
                layout: 'noBorders',
                style: 'contenuto',
                color: colorText,
            };

            if(x > 0){
                data_elems.pageBreak = 'before';
            }

            data_elems.table.body = smallarray;
            data.push(data_elems);
        }

        p3.table.body.push(getTotale(invoice, { fdi : fdi, fcd : fcd }));

        var el = [{ text: '* Soggetto ad IVA', alignment: 'left' }, '', ''];
        p4.table.body.push(el);

        data.push(p3, p4);

        return data;
    }

    function getContenuto_FDiL(){
        var data = [];
        var p1, p2;
        p1 =   [
            {  text: 'Modalità di pagamento:' , color: colorText, alignment: 'left',  margin: [0, 0, 0, 10], style: 'contenuto', },
            getCoordinateBancarie(invoice),
        ];

        var p3 = {
                    table : {
                        widths: [ 'auto', '*', 100],
                        body: []
                    },
                    margin: [0, 10, 0, 0],
                    layout: 'noBorders',
                    color: colorText,
                    lineHeight: 1.5,
                    style: 'contenuto',
                    bold: true
                };
        var p4 = {
                    table : {
                        widths: [ 'auto', '*', 100],
                        body: []
                    },
                    margin: [0, 10, 0, 0],
                    layout: 'noBorders',
                    color: colorText,
                    lineHeight: 1.5,
                    style: 'contenuto',
                    bold: true
                };

        if(getCausale(invoice, fdi).success){
            p1.push(getCausale(invoice, fdi).data);
        }

        var elems_fdi = [25];
        var elems_fcd = [];

        var obj = {
            elems_fdi : elems_fdi,
            elems_fcd : elems_fcd,
            fdi : fdi,
            fcd : fcd
        }

        p2 = insertSpecificElems(invoice, obj);
        p2.color = getTextColor(invoice);
        p2.bold = true;

        var elementi;

        if(parseInt(invoice.Tipologia) !== {$smarty.const.FATTURA_STORNO}){
            data.push(p1);
            elementi = insertElems(invoice, obj);
        }else{
            elementi = insertElems(fatturaStornata, obj);
        }

        data.push(p2);

        var size = 25;
        for (var i=0, x=0; i<elementi.length; i+=size, x++) {
            var smallarray = elementi.slice(i,i+size);
            var data_elems = {
                table : {
                    widths: [ 'auto', '*', 100],
                    body: [],

                },
                layout: 'noBorders',
                style: 'contenuto',
                color: colorText,
            };

            if(x > 0){
                data_elems.pageBreak = 'before';
            }

            data_elems.table.body = smallarray;
            data.push(data_elems);
        }

        p3.table.body.push(getTotale(invoice, { fdi : fdi, fcd : fcd }));

        var el = [{ text: '* Soggetto ad IVA', alignment: 'left' }, '', ''];
        p4.table.body.push(el);

        data.push(p3, p4);

        return data;
    }

    function getContenuto_NONE(){
        var data = [];
        var p1;
        p1 =   [
            {  text: 'Modalità di pagamento:' , color: colorText, alignment: 'left',  margin: [0, 0, 0, 10], style: 'contenuto', },
            getCoordinateBancarie(invoice),
        ];

        var p3 = {
                    table : {
                        widths: [ 'auto', '*', 100],
                        body: []
                    },
                    margin: [0, 10, 0, 0],
                    layout: 'noBorders',
                    color: colorText,
                    lineHeight: 1.5,
                    style: 'contenuto',
                    bold: true
                };
        var p4 = {
                    table : {
                        widths: [ 'auto', '*', 100],
                        body: []
                    },
                    margin: [0, 10, 0, 0],
                    layout: 'noBorders',
                    color: colorText,
                    lineHeight: 1.5,
                    style: 'contenuto',
                    bold: true
                };

        var elems_fdi = [];
        var elems_fcd = [];

        var obj;
        if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
            obj = {
                elems_fdi : elems_fdi,
                elems_fcd : elems_fcd,
                fdi : fdi,
                fcd : fcd
            };
        }else{
            obj = {
                fdc : fdc,
            };
        }

        var elementi = insertElems(invoice, obj);
        var size = 25;
        for (var i=0, x=0; i<elementi.length; i+=size, x++) {
            var smallarray = elementi.slice(i,i+size);
            var data_elems = {
                table : {
                    widths: [ 'auto', '*', 100],
                    body: [],

                },
                layout: 'noBorders',
                style: 'contenuto',
                color: colorText,
            };

            if(x > 0){
                data_elems.pageBreak = 'before';
            }

            data_elems.table.body = smallarray;
            data.push(data_elems);
        }

        if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
            p3.table.body.push(getTotale(invoice, { fdi : fdi, fcd : fcd }));
        }else {
            p3.table.body.push(getTotale(invoice, { fdc : fdc }));
        }

        var el = [{ text: '* Soggetto ad IVA', alignment: 'left' }, '', ''];
        p4.table.body.push(el);

        data.push(p3, p4);

        return data;
    }

    function getTotale(invoice, obj){
        var tot = 0;

        if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
            if(parseInt(obj.fdi.length) > 0){
                for(var chiave in obj.fdi){
                    tot = tot + parseFloat(obj.fdi[chiave].Totale);
                }
            }
            if(parseInt(obj.fcd.length) > 0){
                for(var chiave in obj.fcd){
                    tot = tot + parseFloat(obj.fcd[chiave].Prezzo);
                }
            }
        }else if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_CLIENTI}){
            if(parseInt(obj.fdc.length) > 0){
                for(var chiave in obj.fdc){
                    tot = tot + parseFloat(obj.fdc[chiave].Totale);
                }
            }
        }

        var el = [{ text: 'Totale importo dovuto', alignment: 'left' }, '', { text: (tot).formatMoney(2) + ' €', alignment: 'left' }];

        return el;
    }

    function getTotaleSelected(invoice, obj){

        var tot = 0;

        if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
            for(var chiave in obj.elems_fdi){
                if(countFDI(obj.fdi, obj.elems_fdi[chiave]) > 0){
                    if(getFDI(obj.fdi, obj.elems_fdi[chiave]).success){

                        tot = tot + parseFloat(getFDI(obj.fdi, obj.elems_fdi[chiave]).elem.Totale);

                    }
                }
            }
            for(var chiave in obj.elems_fcd){
                if(countFCD(obj.fcd, obj.elems_fcd[chiave]) > 0){
                    if(getFCD(obj.fcd, obj.elems_fcd[chiave]).success){

                        tot = tot + parseFloat(getFCD(obj.fcd, obj.elems_fcd[chiave]).elem.Prezzo);

                    }
                }
            }
        }else if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_CLIENTI}){

        }

        var el = [{ text: 'Totale', alignment: 'left' }, '', { text: (tot).formatMoney(2) + ' €', alignment: 'left' }];

        return el;
    }

    function insertElems(invoice, obj){
        var data = [];

        if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
            if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_PI} || parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_LOCAZIONE} || parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_NONE}){

                if(obj.fcd.length > 0){
                    for(var chiave in obj.fcd){
                        if(obj.elems_fcd.indexOf(parseInt(obj.fcd[chiave].IdComponente)) >= 0 && countFCD(obj.fcd, parseInt(obj.fcd[chiave].IdComponente)) > 1){
                            var el = [{ text: checkTitoloIva(obj.fcd[chiave]) , alignment: 'left' }, '', { text: obj.fcd[chiave].Prezzo + ' €', alignment: 'left' }];
                            data.push(el);
                        }else if(obj.elems_fcd.indexOf(parseInt(obj.fcd[chiave].IdComponente)) < 0){
                            var el = [{ text: checkTitoloIva(obj.fcd[chiave]) , alignment: 'left' }, '', { text: obj.fcd[chiave].Prezzo + ' €', alignment: 'left' }];
                            data.push(el);
                        }
                    }
                }

                if(obj.fdi.length > 0){
                    for(var chiave in obj.fdi){
                        if(obj.elems_fdi.indexOf(parseInt(obj.fdi[chiave].IdAttribuzione)) >= 0 && countFDI(obj.fdi, parseInt(obj.fdi[chiave].IdAttribuzione)) > 1){
                            var el = [{ text: checkTitoloIva(obj.fdi[chiave]), alignment: 'left' }, '', { text: obj.fdi[chiave].Totale + ' €', alignment: 'left' }];
                            data.push(el);
                        }else if(obj.elems_fdi.indexOf(parseInt(obj.fdi[chiave].IdAttribuzione)) < 0){
                            var el = [{ text: checkTitoloIva(obj.fdi[chiave]), alignment: 'left' }, '', { text: obj.fdi[chiave].Totale + ' €', alignment: 'left' }];
                            data.push(el);
                        }
                    }
                }

            }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_CHIUSURA}){

                if(obj.fcd.length > 0){
                    for(var chiave in obj.fcd){
                        if(obj.elems_fcd.indexOf(parseInt(obj.fcd[chiave].IdComponente)) >= 0 && countFCD(obj.fcd, parseInt(obj.fcd[chiave].IdComponente)) > 1){
                            var el = [{ text: checkTitoloIva(obj.fcd[chiave]) , alignment: 'left' }, '', { text: obj.fcd[chiave].Prezzo + ' €', alignment: 'left' }];
                            data.push(el);
                        }else if(obj.elems_fcd.indexOf(parseInt(obj.fcd[chiave].IdComponente)) < 0){
                            var el = [{ text: checkTitoloIva(obj.fcd[chiave]) , alignment: 'left' }, '', { text: obj.fcd[chiave].Prezzo + ' €', alignment: 'left' }];
                            data.push(el);
                        }
                    }
                }

                if(obj.fdi.length > 0){
                    for(var chiave in obj.fdi){
                        if(obj.elems_fdi.indexOf(parseInt(obj.fdi[chiave].IdAttribuzione)) >= 0 && countFDI(obj.fdi, parseInt(obj.fdi[chiave].IdAttribuzione)) > 1){
                            var el = [{ text: checkTitoloIva(obj.fdi[chiave]), alignment: 'left' }, '', { text: obj.fdi[chiave].Totale + ' €', alignment: 'left' }];
                            data.push(el);
                        }else if(obj.elems_fdi.indexOf(parseInt(obj.fdi[chiave].IdAttribuzione)) < 0){
                            var el = [{ text: checkTitoloIva(obj.fdi[chiave]), alignment: 'left' }, '', { text: obj.fdi[chiave].Totale + ' €', alignment: 'left' }];
                            data.push(el);
                        }
                    }
                }

            }

        }else if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_CLIENTI}){
            if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_NONE} || parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_STORNO} || parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_PI} || parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_LOCAZIONE} || parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_CHIUSURA}){

                if(obj.fdc.length > 0){
                    for(var chiave in obj.fdc){
                        var el2 = [{ text: checkTitoloIva(obj.fdc[chiave]), alignment: 'left' }, '', { text: obj.fdc[chiave].Totale + ' €', alignment: 'left' }];
                        data.push(el2);
                    }
                }

            }
        }
        return data;

    }

    function checkTitoloIva(obj){
        var titolo = obj.Titolo;

        if(parseInt(obj.Iva) === 1){
            titolo = obj.Titolo + ' *';
        }

        return titolo;
    }

    function insertSpecificElems(invoice, obj){

        var data = {
            table : {
                widths: [ 'auto', '*', 100],
                body: []
            },
            layout: 'noBorders',
            style: 'contenuto',
            margin: [0, 10, 0, 0],
        };

        if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
            if(obj.elems_fdi.length > 0){
                for(var chiave in obj.elems_fdi){
                    if(countFDI(obj.fdi, obj.elems_fdi[chiave]) > 0){
                        if(getFDI(obj.fdi, obj.elems_fdi[chiave]).success){
                            var el = [{ text: getFDI(obj.fdi, obj.elems_fdi[chiave]).elem.Titolo , alignment: 'left' }, '', { text: getFDI(obj.fdi, obj.elems_fdi[chiave]).elem.Totale + ' €', alignment: 'left' }];
                            data.table.body.push(el);
                        }
                    }
                }
            }

            if(obj.elems_fcd.length > 0){
                for(var chiave in obj.elems_fcd){
                    if(countFCD(obj.fcd, obj.elems_fcd[chiave]) > 0){
                        if(getFCD(obj.fcd, obj.elems_fcd[chiave]).success){
                            var el = [{ text: getFCD(obj.fcd, obj.elems_fcd[chiave]).elem.Titolo , alignment: 'left' }, '', { text: getFCD(obj.fcd, obj.elems_fcd[chiave]).elem.Prezzo + ' €', alignment: 'left' }];
                            data.table.body.push(el);
                        }
                    }
                }
            }
        }else if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_CLIENTI}){

            if(obj.elems_fdc.length > 0){
                for(var chiave in obj.elems_fdc){
                    if(countFDC(obj.fdc, obj.elems_fdc[chiave]) > 0){
                        if(getFDC(obj.fdc, obj.elems_fdc[chiave]).success){
                            var el = [{ text: getFDC(obj.fdc, obj.elems_fdc[chiave]).elem.Titolo , alignment: 'left' }, '', { text: getFDC(obj.fdc, obj.elems_fdc[chiave]).elem.Totale + ' €', alignment: 'left' }];
                            data.table.body.push(el);
                        }
                    }
                }
            }

        }
        return data;

    }



    function getCausale(invoice, fdi){
        var causale = {  text: 'Causale da indicare nella disposizione di bonifico: ' , color: colorText, alignment: 'left',  margin: [0, 10, 0, 0] };
        var titolo;
        var success = false;

        if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_NONE}){
            causale = null;
        }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_PI}){
            if(causaleLocazione(invoice, fdi).success){
                titolo = causaleLocazione(invoice, fdi).titolo;
                success = true;
            }
        }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_LOCAZIONE}){
            if(causaleLocazione(invoice, fdi).success){
                titolo = causaleLocazione(invoice, fdi).titolo;
                success = true;
            }
        }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_CHIUSURA}){
            if(causaleChiusura(invoice).success){
                titolo = causaleChiusura(invoice).titolo;
                success = true;
            }
        }

        var data = {
            table : {
                widths: ['auto'],
                body: [
                        [ causale],
                        [ titolo ]
                ]
            },
            layout: 'noBorders',
            lineHeight: 0.75,
            style: 'contenuto',
        }

        return { data: data, success : success};
    }

    function causaleLocazione(invoice, fdi){
        var titolo;
        var fdi_locazione;
        var success = false;

        if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_PI} || parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_LOCAZIONE}){
            if(uniqueFDI(fdi, 25).success){
                fdi_locazione = uniqueFDI(fdi, 25).elem;
                fdi_locazione.Inizio = new Date(fdi_locazione.Inizio);
                fdi_locazione.Fine = new Date(fdi_locazione.Fine);
                if(fdi_locazione){
                    titolo = {  text : [
                                { text: 'Canone di locazione e spese periodo ', color: colorText, alignment: 'left',  margin: [0, 0, 0, 10] },
                                { text: fdi_locazione.Inizio.ddmmyyyy() + ' - ' + fdi_locazione.Fine.ddmmyyyy(), color: getTextColor(invoice), alignment: 'left',  margin: [0, 0, 0, 10], bold: true },
                                { text: ' RIF. ' + inquilino.Cognome + ' ' + inquilino.Nome , color: getTextColor(invoice), alignment: 'left',  margin: [0, 0, 0, 10], bold: true },
                            ] };
                    success = true;
                }
            }
        }

        return { titolo : titolo, success: success};
    }

    function causaleChiusura(invoice){
        var titolo;
        var success = false;

        if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_CHIUSURA}){
            titolo = {  text : [
                                    { text: 'Fattura di fine locazione ', color: colorText, alignment: 'left',  margin: [0, 0, 0, 10] },
                                    { text: ' RIF. ' + inquilino.Cognome + ' ' + inquilino.Nome , color: getTextColor(invoice), alignment: 'left',  margin: [0, 0, 0, 10], bold: true },
                                ]
                     };
            success = true;
        }

        return { titolo : titolo, success: success};
    }

    function uniqueFDI(fdi, idAttribuzione){
        var elem;
        var success = false;
        if(countFDI(fdi, idAttribuzione) === 1){
            for (var chiave in fdi) {
                var data = $.extend(new FatturaDettagliInquilino(), fdi[chiave]);
                if(parseInt(data.IdAttribuzione) === parseInt(idAttribuzione)){
                    elem = data;
                    success = true;
                }
            }
        }
        return { elem: elem, success: success };
    }

    function getFDI(fdi, idAttribuzione){
        var elem;
        var success = false;
        for (var chiave in fdi) {
            var data = $.extend(new FatturaDettagliInquilino(), fdi[chiave]);
            if(parseInt(data.IdAttribuzione) === parseInt(idAttribuzione)){
                elem = data;
                success = true;
            }
        }
        return { elem: elem, success: success };
    }

    function countFDI(fdi, idAttribuzione){
        var data;
        var counter = 0;
        for (var chiave in fdi) {
            data = $.extend(new FatturaDettagliInquilino(), fdi[chiave]);
            if(parseInt(data.IdAttribuzione) === parseInt(idAttribuzione)){
                counter++;
            }
        }

        return counter;
    }

    function uniqueFCD(fcd, idComponente){
        var elem;
        var success = false;
        if(countFDI(fcd, idComponente) === 1){
            for (var chiave in fcd) {
                var data = $.extend(new ComponenteDettagli(), fcd[chiave]);
                if(parseInt(data.IdComponente) === parseInt(idComponente)){
                    elem = data;
                    success = true;
                }
            }
        }
        return { elem: elem, success: success };
    }

    function getFCD(fcd, idComponente){
        var elem;
        var success = false;
        for (var chiave in fcd) {
            var data = $.extend(new ComponenteDettagli(), fcd[chiave]);
            if(parseInt(data.IdComponente) === parseInt(idComponente)){
                elem = data;
                success = true;
            }
        }
        return { elem: elem, success: success };
    }

    function countFCD(fcd, idComponente){
        var data;
        var counter = 0;
        for (var chiave in fcd) {
            data = $.extend(new ComponenteDettagli(), fcd[chiave]);
            if(parseInt(data.IdComponente) === parseInt(idComponente)){
                counter++;
            }
        }

        return counter;
    }

    function uniqueFDC(fdc, idAttribuzione){
        var elem;
        var success = false;
        if(countFDI(fdc, idAttribuzione) === 1){
            for (var chiave in fdc) {
                var data = $.extend(new FatturaDettagliCliente(), fdc[chiave]);
                if(parseInt(data.IdAttribuzione) === parseInt(idAttribuzione)){
                    elem = data;
                    success = true;
                }
            }
        }
        return { elem: elem, success: success };
    }

    function getFDC(fdc, idAttribuzione){
        var elem;
        var success = false;
        for (var chiave in fdc) {
            var data = $.extend(new FatturaDettagliCliente(), fdc[chiave]);
            if(parseInt(data.IdAttribuzione) === parseInt(idAttribuzione)){
                elem = data;
                success = true;
            }
        }
        return { elem: elem, success: success };
    }

    function countFDC(fdc, idAttribuzione){
        var data;
        var counter = 0;
        for (var chiave in fdc) {
            data = $.extend(new ComponenteDettagli(), fdc[chiave]);
            if(parseInt(data.IdAttribuzione) === parseInt(idAttribuzione)){
                counter++;
            }
        }

        return counter;
    }

    function getCoordinateBancarie(invoice){
        var data;
        if(parseInt(invoice.Societa) === {$smarty.const.FINLIBERA}){
            data = {
                table : {
                    widths: ['auto', '*', '*'],
                    body: [
                            [ { text: 'Bonifico Bancario intestato a Finlibera s.p.a.', color: colorText }, '', ''],
                            [ { text: 'IBAN: IT80S0100501606000000000812', color: colorText }, '', '' ],
                            [ { text: 'Bic/Swift: BNLIITRR', color: colorText }, '', '' ],
                            [ { text: 'Nome Banca: Banca Nazionale Del Lavoro', color: colorText }, '', '' ]
                    ]
                },
                layout: 'noBorders',
                lineHeight: 0.75,
                style: 'contenuto',
            };
        }else if(parseInt(invoice.Societa) === {$smarty.const.ECOLIBERA}){
            data = {
                table : {
                    widths: ['auto', '*', '*'],
                    body: [
                            [ { text: 'Bonifico Bancario intestato a Ecolibera Srl', color: colorText }, '', ''],
                            [ { text: 'IBAN: IT88T0100501606000000001225', color: colorText }, '', '' ],
                            [ { text: 'Bic/Swift: BNLIITRR', color: colorText }, '', '' ],
                            [ { text: 'Nome Banca: Banca Nazionale Del Lavoro', color: colorText }, '', '' ]
                    ]
                },
                layout: 'noBorders',
                style: 'contenuto',
            };
        }

        return data;
    }

    function getNomeFile(titolo){

        titolo = '';

        if(parseInt(invoice.Numero) > 0){
            titolo += invoice.Numero + '-';
        }
        if(invoice.Data !== null && invoice.Data !== ''){
            var dataFattura = new Date(invoice.Data);
            titolo += dataFattura.getFullYear().toString().substr(2,2) + ' ';
        }

        if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_INQUILINI}){
            titolo += inquilino.Cognome + ' ' + inquilino.Nome;
        }else if(parseInt(invoice.TipologiaDestinatario) === {$smarty.const.DESTINATARI_CLIENTI}){
            titolo += cliente.Cognome + ' ' + cliente.Nome;
        }

        if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_PI}){
            titolo += ' APERTURA';
        }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_CHIUSURA}){
            titolo += ' CHIUSURA';
        }else if(parseInt(invoice.Tipologia) === {$smarty.const.FATTURA_STORNO}){
            titolo += ' NOTADICREDITO';
        }

        return titolo;
    }

    function getFooter(invoice){
        var footer;
        if(parseInt(invoice.Societa) === {$smarty.const.FINLIBERA}){
            footer = {
                stack: [
				{   text:  [
                                                    { text: 'Finlibera s.p.a. ', style: 'textFooter' },
                                                    { text: 'Via Pier Lombardo, 30 - 20135 Milano MI', color: colorText }
                                            ],
                                    alignment: 'center'
				},
				{   text:   [
                                                    /*{ text: 'Tel./Fax: ', style: 'textFooter' },
                                                    { text: '+39 0236743720 | ', color: colorText },*/
                                                    { text: 'Email: ', style: 'textFooter' },
                                                    { text: 'segreteria@finlibera.it | ', color: colorText },
                                                    { text: 'PEC: ', style: 'textFooter' },
                                                    { text: 'finlibera@pec.it | ', color: colorText },
                                                    { text: 'Web: ', style: 'textFooter' },
                                                    { text: 'www.finlibera.it', color: colorText }
                                            ],
                                    alignment: 'center'
                                },
				{   text:   [
                                                    { text: 'P.IVA: ', style: 'textFooter' },
                                                    { text: '07301400961 | ', color: colorText },
                                                    { text: 'R.E.A. ', style: 'textFooter' },
                                                    { text: 'MI-1949464 | ', color: colorText },
                                                    { text: 'Capitale sociale: ', style: 'textFooter' },
                                                    { text: '250.000 € | ', color: colorText },
                                                    { text: 'Sede legale: ', style: 'textFooter' },
                                                    { text: 'Via Pier Lombardo, 30 - 20135 Milano', color: colorText }
                                            ],
                                    alignment: 'center'
				},
			],
                fontSize: 7,
                //height: 60,
            };
        }else if(parseInt(invoice.Societa) === {$smarty.const.ECOLIBERA}){
            footer = {
                stack: [
				{   text:  [
                                                    { text: 'Ecolibera Srl, ', style: 'textFooter' },
                                                    { text: 'Via Pier Lombardo, 30 - 20135 Milano MI', color: colorText }
                                            ],
                                    alignment: 'center'
				},
				{   text:   [
                                                    /*{ text: 'Tel./Fax: ', style: 'textFooter' },
                                                    { text: '+39 0236743720 | ', color: colorText },*/
                                                    { text: 'Email: ', style: 'textFooter' },
                                                    { text: 'ecolibera@legalmail.it | ', color: colorText },
                                                    { text: 'Web: ', style: 'textFooter' },
                                                    { text: 'www.ecolibera.it', color: colorText }
                                            ],
                                    alignment: 'center'
                                },
				{   text:   [
                                                    { text: 'P.IVA: ', style: 'textFooter' },
                                                    { text: '03950960165 | ', color: colorText },
                                                    { text: 'R.E.A. ', style: 'textFooter' },
                                                    { text: 'BG-422559 | ', color: colorText },
                                                    { text: 'Sede legale: ', style: 'textFooter' },
                                                    { text: 'Via Angelo Mai,4 - 24121 Bergamo', color: colorText }
                                            ],
                                    alignment: 'center'
				},
			],
                fontSize: 7,
            };
        }

        return footer;
    }

</script>
