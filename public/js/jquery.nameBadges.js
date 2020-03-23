(function ($) {
	$.fn.nameBadge = function (options) {
		var settings = $.extend({
			border: {
				color: '#ddd',
				width: 3
			},
			colors: ['#a3a948', '#edb92e', '#f85931', '#ce1836', '#009989'],
			text: '#fff',
			size: 72,
			margin: 5,
			middlename: false,
			uppercase: true
		}, options);
		return this.each(function () {
			var elementText = $(this).text();
			var initialLetters = elementText.match(settings.middlename ? /\b(\w)/g : /^\w|\b\w(?=\S+$)/g);
			var initials = initialLetters.join('');
			$(this).text(initials);
			$(this).css({
				'color': settings.text,
				'background-color': settings.colors[Math.floor(Math.random() * settings.colors.length)],
				'border': settings.border.width + 'px solid ' + settings.border.color,
				'display': 'inline-block',
				'font-family': 'Arial, \'Helvetica Neue\', Helvetica, sans-serif',
				'font-size': settings.size * 0.4,
				'border-radius': settings.size + 'px',
				'width': settings.size + 'px',
				'height': settings.size + 'px',
				'line-height': settings.size + 'px',
				'margin': settings.margin + 'px',
				'text-align': 'center',
				'text-transform' : settings.uppercase ? 'uppercase' : ''
			});
		});
	};
}(jQuery));

function generateNameBadge(element) {
	var elementText = $(element).text();
	var initialLetters = elementText.match(settings.middlename ? /\b(\w)/g : /^\w|\b\w(?=\S+$)/g);
	var initials = initialLetters.join('');
	$(element).text(initials);
	$(element).css({
		'color': '#fff',
		'background-color': '#009989',
		'border': 3 + 'px solid ' + '#ddd',
		'display': 'inline-block',
		'font-family': 'Arial, \'Helvetica Neue\', Helvetica, sans-serif',
		'font-size': 72 * 0.4,
		'border-radius': 72 + 'px',
		'width': 72 + 'px',
		'height': 72 + 'px',
		'line-height': 72 + 'px',
		'margin': 5 + 'px',
		'text-align': 'center',
		'text-transform' : true ? 'uppercase' : ''
	});
}	