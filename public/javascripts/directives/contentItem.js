var app = angular.module('contentItemDirective', []);

app.directive('contentItem', function ($compile, $sce) {
    var postTemplate        ='<section class="box"><h3>{{content.name}}</h3><p>{{content.data}}</p></section>';
    var youTubeTemplate     ='<section class="box"><h3>{{content.name}}</h3><div style="height:300px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div></section>'; 
    var imageUrlTemplate    ='<section class="box"><h3>{{content.name}}</h3><img ng-src="{{content.data}}" height="300" width="300"></img></section>';
    var imgurTemplate       ='<section class="box"><h3>{{content.name}}</h3> <video height="300" width="326" autoplay="" loop="" muted=""><source type="video/mp4" ng-src="{{content.data}}"></video></section>';
    
    /* var imgurTemplate       ='<blockquote height="300" width="300" class="imgur-embed-pub" lang="en" data-id="{{content.source}}"><a href="//imgur.com/{{content.source}}">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8 height="300" width="300""></script>'*/
    
    var getTemplate = function(contentType){
        var template = '';
        switch(contentType) {
            case 'youtube':
                template = youTubeTemplate;
                break
            case 'post':
                template = postTemplate;
                break
            case 'imageUrl':
                template = imageUrlTemplate;
                break
            case 'imgur':
                template = imgurTemplate;
                break
        }

        return template;
    }

    var linker = function(scope, element, attrs){
        if (scope.content.contentType === "youtube") {
            scope.$watch('source', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                    }
                });
        }
        if (scope.content.contentType === "imgur") {
            scope.$watch('source', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://i.imgur.com/" + newVal + ".mp4");
                }
            });
        }
        element.html(getTemplate(scope.content.contentType)).show();
        $compile(element.contents())(scope);
    }

    return {
        restrict:   "EA",
        replace:    true,
        scope:      {
                    content:'=',
                    source:'='
                    },
        link:       linker
    };
});
            

