package DDG::Goodie::IsAwesome::chercolvin;
# ABSTRACT: chercolvin's first goodie

use DDG::Goodie;

zci answer_type => "is_awesome_chercolvin";
zci is_cached   => 1;

# Metadata
name "IsAwesome chercolvin";
description "My first Goodie, it lets the world know that chercolvin is awesome";
primary_example_queries "duckduckhack chercolvin";
category "special";
topics "special_interest", "geek";
code_url "https://github.com/duckduckgo/zeroclickinfo-goodies/blob/master/lib/DDG/Goodie/IsAwesome/chercolvin.pm";
attribution github => ["chercolvin", "Cheryl Colvin"],
            twitter => "chercolvin";

# Triggers
triggers start => "duckduckhack chercolvin";

# Handle statement
handle remainder => sub {

    return if $_;
    return "chercolvin is awesome and has successfully completed the DuckDuckHack Goodie tutorial!";
    
};

1;
