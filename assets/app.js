document.addEventListener('DOMContentLoaded', function() {
    // A/B variant
    try {
        var variant = Math.random() > 0.5 ? 'b' : 'a';
        if (variant === 'b') document.body.classList.add('ab-variant-b');
        console.log('AB Variant:', variant.toUpperCase());
    } catch (e) {}

    // Portal quiz
    var selected = null;
    var networking = document.getElementById('networking-option');
    var business = document.getElementById('business-option');
    var cta = document.getElementById('orientation-cta');
    var netDot = document.getElementById('networking-dot');
    var bizDot = document.getElementById('business-dot');

    function select(option) {
        selected = option;
        if (netDot) netDot.style.opacity = option === 'networking' ? '1' : '0';
        if (bizDot) bizDot.style.opacity = option === 'business' ? '1' : '0';
        if (cta) {
            cta.disabled = false;
            cta.style.opacity = '1';
        }
        console.log('Quiz option selected:', option);
    }

    if (networking) networking.addEventListener('click', function(){ select('networking'); });
    if (business) business.addEventListener('click', function(){ select('business'); });
    if (cta) cta.addEventListener('click', function(){
        if (!selected) return;
        if (selected === 'networking') window.location.href = 'du/';
        else window.location.href = 'revo/';
    });

    // Quick navigation cards
    var toDu = document.getElementById('go-du');
    var toRevo = document.getElementById('go-revo');
    if (toDu) toDu.addEventListener('click', function(){ window.location.href = 'du/'; });
    if (toRevo) toRevo.addEventListener('click', function(){ window.location.href = 'revo/'; });
});
